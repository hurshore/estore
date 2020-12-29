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
        products: action.payload.products,
        quantity: action.payload.quantity,
        total: action.payload.total
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
