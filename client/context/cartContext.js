import { useReducer, useContext, createContext } from 'react';
import * as actionTypes from './actionTypes';

const CartStateContext = createContext();
const CartDispatchContext = createContext();
let newProducts;

const initialState = {
  products: [],
  quantity: 0,
  total: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_CART:
      console.log(action.payload);
      return { 
        ...state, 
        products: action.payload.cart.products || [],
        quantity: action.payload.cart.quantity || 0,
        total: action.payload.cart.total || 0
      }
    case actionTypes.ADD_TO_CART:
      console.log('Adding product to context');
      const index = state.products.findIndex(product => product._id === action.payload.product.productId);
      if(index > -1) {
        // Increase product quantity in cart
        newProducts = state.products.map(product => product._id !== action.payload.product.productId ?
          product : { ...product, quantity: product.quantity + action.payload.product.quantity }
        )
      } else {
        // Add a new product to the cart
        newProducts = [
          ...state.products,
          {
            _id: action.payload.product.productId,
            name: action.payload.product.productName,
            price: action.payload.product.price,
            img: action.payload.product.img,
            quantity: action.payload.product.quantity,
            colors: action.payload.product.colors
          }
        ]
      }
      if(!action.payload.auth) {
        localStorage.setItem('cart', JSON.stringify({
          ...state,
          products: newProducts,
          quantity: state.quantity + action.payload.product.quantity,
          total: state.total + (action.payload.product.price * action.payload.product.quantity)
        }))
      }
      return {
        ...state,
        products: newProducts,
        quantity: state.quantity + action.payload.product.quantity,
        total: state.total + (action.payload.product.price * action.payload.product.quantity)
      }
    case actionTypes.DELETE_FROM_CART:
      console.log(action.payload);
      let freshProducts;
      const productToDelete = state.products.find(product => product._id === action.payload.productId);
      console.log(productToDelete);
      if(productToDelete.quantity < action.payload.quantity) throw new Error('Insufficent products');
      
      if(productToDelete.quantity === action.payload.quantity) {
        freshProducts = state.products.filter(product => product._id !== action.payload.productId);
      } else {
        freshProducts = state.products.map(product => product._id !== action.payload.productId ?
          product : { ...product, quantity: product.quantity - action.payload.quantity }
        )
      }
      if(!action.payload.auth) {
        localStorage.setItem('cart', JSON.stringify({
          ...state,
          products: freshProducts,
          quantity: state.quantity - action.payload.quantity,
          total: state.total - (productToDelete.price * action.payload.quantity)
        }))
      }
      return {
        ...state,
        products: freshProducts,
        quantity: state.quantity - action.payload.quantity,
        total: state.total - (productToDelete.price * action.payload.quantity)
      };
    case actionTypes.CLEAR_FROM_CART:
      newProducts = state.products.filter(product => product._id !== action.payload.productId);
      const productToClear = state.products.find(product => product._id === action.payload.productId);
      if(!action.payload.auth) {
        localStorage.setItem('cart', JSON.stringify({
            ...state,
          products: newProducts,
          quantity: state.quantity - productToClear.quantity,
          total: state.total - (productToClear.quantity * productToClear.price)
        }))
      }
      return {
        ...state,
        products: newProducts,
        quantity: state.quantity - productToClear.quantity,
        total: state.total - (productToClear.quantity * productToClear.price)
      }
    case actionTypes.RESET_CART:
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
