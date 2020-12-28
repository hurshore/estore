import { useReducer, useContext, createContext } from 'react';
import * as actionTypes from './actionTypes';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
  userId: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_CART:
      return { ...state, token: action.payload }
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

export const useAuth = () => useContext(CartStateContext)
export const useDispatchAuth = () => useContext(CartDispatchContext)
