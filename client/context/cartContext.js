import { useReducer, useContext, createContext } from 'react';
import * as actionTypes from './actionTypes';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const initialState = {
  products: [],
  quantity: 0,
  total: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_CART:
      return { 
        ...state, 
        products: action.payload.products || [],
        quantity: action.payload.quantity || 0,
        total: action.payload.total || 0
      }
    case actionTypes.ADD_TO_CART:
      let newProducts;
      const index = state.products.findIndex(product => product._id === action.payload.productId);
      if(index > -1) {
        // Increase product quantity in cart
        newProducts = state.products.map(product => product._id !== action.payload.productId ?
          product : { ...product, quantity: product.quantity + action.payload.quantity }
        )
      } else {
        // Add a new product to the cart
        newProducts = [
          ...state.products,
          {
            _id: action.payload.productId,
            name: action.payload.productName,
            price: action.payload.price,
            img: action.payload.img,
            quantity: action.payload.quantity
          }
        ]
      }
      localStorage.setItem('cart', JSON.stringify({
        ...state,
        products: newProducts,
        quantity: state.quantity + action.payload.quantity,
        total: state.total + (action.payload.price * action.payload.quantity)
      }))
      return {
        ...state,
        products: newProducts,
        quantity: state.quantity + action.payload.quantity,
        total: state.total + (action.payload.price * action.payload.quantity)
      }
    case actionTypes.LOGOUT:
      return initialState
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)
