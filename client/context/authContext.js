import { useReducer, useContext, createContext } from 'react';
import * as actionTypes from './actionTypes';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const initialState = {
  token: null,
  user: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return { ...state, token: action.payload }
    case actionTypes.SET_USER:
      return { ...state, user: action.state }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  )
}

export const useAuth = () => useContext(AuthStateContext)
export const useDispatchAuth = () => useContext(AuthDispatchContext)
