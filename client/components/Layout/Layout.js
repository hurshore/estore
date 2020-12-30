import { useEffect } from 'react';
import Nav from '../Nav/Nav';
import { useAuth, useDispatchAuth } from '../../context/authContext';
import { useCart, useDispatchCart } from '../../context/cartContext';
import * as actionTypes from '../../context/actionTypes';

const layout = (props) => {
  const authState = useAuth();
  const dispatchAuth = useDispatchAuth();
  const dispatchCart = useDispatchCart();
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

  useEffect(async () => {
    if(token) {
      // Get user's cart
      const res = await fetch('http://localhost:5000/api/cart', {
        headers: {
          'auth-token': token
        }
      });
      const data = await res.json();
      console.log(data);

      dispatchCart({
        type: actionTypes.SET_CART,
        payload: data
      })
    } else {
      const cart = JSON.parse(localStorage.getItem('cart'));
      if(cart) {
        dispatchCart({
          type: actionTypes.SET_CART,
          payload: cart
        })
      }
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