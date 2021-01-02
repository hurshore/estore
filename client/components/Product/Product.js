import { useState, useEffect } from 'react';
import classes from './Product.module.css';
import Image from 'next/image';
import { useDispatchCart } from '../../context/cartContext';
import { useAuth } from '../../context/authContext';
import * as actionTypes from '../../context/actionTypes';
import usePrevious from '../../hooks/usePrevious';

const product = ({ product }) => {
  const [productQuantity, setProductQuantity] = useState(product.quantity);
  const [prevProductQuantity, setPrevProductQuantity] = useState(product.quantity);
  const dispatchCart = useDispatchCart();
  const prevQuantity = usePrevious(productQuantity);
  const authState = useAuth();

  const incrementQuantity = async () => {
    console.log('Adding product to database');
    const productToAdd = {
      productId: product._id,
      productName: product.name,
      price: product.price,
      img: product.img,
      quantity: productQuantity - prevProductQuantity,
      colors: product.colors
    }

    if(authState.token) {
      try {
        const res = await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authState.token
          },
          body: JSON.stringify(productToAdd),
        })
        if(!res.ok) {
          throw res.clone.json();
        }
        const data = await res.json();
        setPrevProductQuantity(productQuantity);
        console.log(data);
      } catch(err) {
        console.log(err);
      }
    }

    dispatchCart({
      type: actionTypes.ADD_TO_CART,
      payload: {
        product: productToAdd,
        auth: authState.token ? true : false
      }
    });
  }

  const decrementQuantity = () => {
    console.log('Deleting product from database');
  }

  useEffect(() => {
    if(productQuantity === prevProductQuantity) return;
    let timeout;
    
    if(productQuantity > prevProductQuantity) {
      timeout = setTimeout(() => incrementQuantity(), 2000);
    } else {
      timeout = setTimeout(() => decrementQuantity(), 2000);
    }

    return () => {
      clearTimeout(timeout);
    }
  }, [productQuantity])

  // useEffect(() => {
  //   const productToAdd = {
  //     productId: product._id,
  //     productName: product.name,
  //     price: product.price,
  //     img: product.img,
  //     quantity: 1,
  //     colors: product.colors
  //   }
  //   console.log('Product to add', productToAdd);

  //   dispatchCart({
  //     type: actionTypes.ADD_TO_CART,
  //     payload: productToAdd,
  //     auth: authState.token ? true : false
  //   });

  //   if(authState.token) {
  //     setTimeout(async () => {
  //       // console.log(count);
  //       const body = { ...productToAdd, quantity: count };
  //       console.log('body', body);

  //       try {
  //         const res = await fetch('http://localhost:5000/api/cart', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'auth-token': authState.token
  //           },
  //           body: JSON.stringify(body),
  //         })
  //         if(!res.ok) {
  //           throw res.clone.json();
  //         }
  //         const data = await res.json(body);
  //         // setCount(0);
  //         console.log(data);
  //       } catch(err) {
  //         console.log(err);
  //       }
  //     }, 3000)
  //   }
  //   return () => {
  //     // Clear timeout
  //   }
  // }, [count])

  return (
    <div key={product._id} className={classes.productContainer}>
      <div className={classes.productImage}>
        <Image src={product.img} alt="product" width={100} height={100} />
      </div>
      <div className={classes.productDetails}>
        <h4>{product.name}</h4>
        <p className={classes.productColor}>
          <span>Color: </span>
          {/* {product.colors[0]} */}
          Random Color
        </p>
        <h3 className={classes.price}>${product.price}</h3>
        <p className={classes.shipping}>Shipping: $0</p>
      </div>
      <div className={classes.delete}>
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