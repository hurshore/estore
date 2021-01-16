import { useEffect } from 'react';
import Nav from '../Nav/Nav';
import { useAuth, useDispatchAuth } from '../../context/authContext';
import { useDispatchCart } from '../../context/cartContext';
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
  }, [token]);

  useEffect(async () => {
    if(token) {
      console.log('Token found');
      // Get user's cart
      const cart = JSON.parse(localStorage.getItem('cart'));
      if(cart) {
        console.log('Cart in LS', cart);
        // Add cart in local storage to the db
        try {
          const res = await fetch('https://nodejs-estore.herokuapp.com/api/cart/batch', {
            method: 'POST',
            headers: {
              'auth-token': token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
          })
          await res.json();
          localStorage.removeItem('cart');
          fetchCart();
        } catch(err) {
          console.log(err);
        }
      } else {
        fetchCart();
      }
    } else {
      // Get cart from local storage
      const cart = JSON.parse(localStorage.getItem('cart'));
      if(cart) {
        dispatchCart({
          type: actionTypes.SET_CART,
          payload: {
            cart
          }
        })
      }
    }
  }, [token])

  const fetchCart = async () => {
    console.log('Fetching cart');
    const res = await fetch('https://nodejs-estore.herokuapp.com/api/cart', {
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    console.log(data);

    dispatchCart({
      type: actionTypes.SET_CART,
      payload: {
        cart: {
          products: data.products,
          quantity: data.quantity,
          total: data.total
        }
      }
    })
  }

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