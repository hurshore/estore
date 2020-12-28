import { useEffect } from 'react';
import Nav from '../Nav/Nav';
import { useAuth, useDispatchAuth } from '../../context/authContext';
import * as actionTypes from '../../context/actionTypes';

const layout = (props) => {
  const authState = useAuth();
  const dispatchAuth = useDispatchAuth();
  const { token } = authState;

  useEffect(() => {
    // Try to log in automatically
    const token = localStorage.getItem('auth-token');
    if(token) {
      dispatchAuth({
        type: actionTypes.SET_TOKEN,
        payload: token
      })
    }
  }, [token])

  useEffect(() => {
    if(token) {
      // Get user's cart
    }
  }, [token])

  return (
    <>
      <Nav />
      <main>
        {props.children}
      </main>
    </>
  )
}

export default layout;