import { useState, useEffect } from 'react';
import classes from './Product.module.css';
import Image from 'next/image';
import { useDispatchCart } from '../../context/cartContext';
import { useAuth } from '../../context/authContext';
import * as actionTypes from '../../context/actionTypes';

const product = ({ product }) => {
  const [productQuantity, setProductQuantity] = useState(product.quantity);
  const [prevProductQuantity, setPrevProductQuantity] = useState(product.quantity);
  const dispatchCart = useDispatchCart();
  const authState = useAuth();
  const { token } = authState;

  const clearItem = async () => {
    if(token) {
      try {
        const res = await fetch('https://nodejs-estore.herokuapp.com/api/cart/clear', {
          method: 'DELETE',
          headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId: product._id })
        })
        const data = await res.json();
      } catch(err) {
        console.log(err);
      }
    }
    dispatchCart({
      type: actionTypes.CLEAR_FROM_CART,
      payload: {
        productId: product._id
      }
    })
  }

  const incrementQuantity = async () => {
    const productToAdd = {
      productId: product._id,
      productName: product.name,
      price: product.price,
      img: product.img,
      quantity: productQuantity - prevProductQuantity,
      colors: product.colors
    }

    if(token) {
      try {
        const res = await fetch('https://nodejs-estore.herokuapp.com/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          },
          body: JSON.stringify(productToAdd),
        })
        if(!res.ok) {
          throw res.clone.json();
        }
        const data = await res.json();
      } catch(err) {
        console.log(err);
      }
    }

    setPrevProductQuantity(productQuantity);
    dispatchCart({
      type: actionTypes.ADD_TO_CART,
      payload: {
        product: productToAdd,
        auth: token ? true : false
      }
    });
  }

  const decrementQuantity = async () => {
    const productToDelete = {
      productId: product._id,
      quantity: prevProductQuantity - productQuantity
    }
    
    if(token) {
      try {
        const res = await fetch('https://nodejs-estore.herokuapp.com/api/cart', {
          method: 'DELETE',
          headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productToDelete)
        })
        const data = await res.json();
      } catch(err) {
        console.log(err);
      }
    }

    setPrevProductQuantity(productQuantity);
    dispatchCart({
      type: actionTypes.DELETE_FROM_CART,
      payload: {
        productId: product._id,
        quantity: prevProductQuantity - productQuantity,
        auth: token ? true : false
      }
    })
  }

  useEffect(() => {
    if(productQuantity === prevProductQuantity) return;
    let timeout;
    
    if(productQuantity > prevProductQuantity) {
      if(!token) {
        incrementQuantity()
      } else {
        timeout = setTimeout(() => incrementQuantity(), 1000);
      }
    } else {
      if(!token) {
        decrementQuantity();
      } else {
        timeout = setTimeout(() => decrementQuantity(), 1000);
      }
    }

    return () => {
      clearTimeout(timeout);
    }
  }, [productQuantity])

  return (
    <div key={product._id} className={classes.productContainer}>
      <div className={classes.productImage}>
        <Image src={product.img} alt="product" width={100} height={100} objectFit="contain" />
      </div>
      <div className={classes.productDetails}>
        <h4>{product.name}</h4>
        <p className={classes.productColor}>
          <span>Colors: </span>
          {product.colors && product.colors.map((color, index) => {
            if(index + 1 < product.colors.length) return (<span key={color}>{color}, </span>);
            return (<span key={color}>{color}</span>);
          })}
        </p>
        <h3 className={classes.price}>${product.price}</h3>
        <p className={classes.shipping}>Shipping: $0</p>
      </div>
      <div className={classes.delete} onClick={clearItem}>
        <Image src="/delete.svg" alt="delete" width={20} height={20} />
      </div>
      <div className={classes.quantity}>
        <button onClick={() => productQuantity > 1 && setProductQuantity(productQuantity - 1)}>-</button>
        <span>{productQuantity}</span>
        <button onClick={() => setProductQuantity(productQuantity + 1)}>+</button>
      </div>
    </div>
  )
}

export default product;