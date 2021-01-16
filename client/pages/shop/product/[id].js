import { useState } from 'react';
import classes from './product.module.css';
import Image from 'next/image';
import Button from '../../../components/UI/Button/Button';
import { useAuth } from '../../../context/authContext';
import { useDispatchCart } from '../../../context/cartContext';
import * as actionTypes from '../../../context/actionTypes';

const product = ({ product }) => {
  const [productQuantity, setProductQuantity] = useState(1);
  const authState = useAuth();
  const dispatchCart = useDispatchCart();
  const productStars = Math.round(product.starrating);

  const changeQuantityHandler = (event) => {
    setProductQuantity(event.target.value);
  }

  const incrementQuantity = () => {
    setProductQuantity(parseInt(productQuantity) + 1);
  }

  const decrementQuantity = () => {
    if(productQuantity > 1) {
      setProductQuantity(parseInt(productQuantity) - 1);
    }
  }

  const addToCart = async () => {
    console.log('Adding to cart');
    const productToAdd = {
      productId: product._id,
      productName: product.name,
      price: product.price,
      img: product.img,
      quantity: productQuantity,
      colors: product.colors
    }

    console.log(product.colors);

    if(authState.token) {
      try {
        const res = await fetch('https://nodejs-estore.herokuapp.com/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authState.token
          },
          body: JSON.stringify(productToAdd),
        })
        const data = await res.json();
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
      },
      
    });
  }

  return (
    <div className={classes.product}>
      <div className={classes.productImage}>
        <Image src={product.img} alt="product" width={300} height={300} />
      </div>

      <div className={classes.productDetails}>
        <h2 className={classes.name}>{product.name}</h2>
        <h3 className={classes.price}>{`$${product.price}`}</h3>
        <div className={classes.rating}>
          { 
            Array(productStars).fill('star').map((_, index) => (
              <Image key={index} src="/star.svg" alt="star" width={20} height={20} />
            )) 
          }
          {
            Array(5 - productStars).fill('star').map((_, index) => (
              <Image key={index} src="/star-black.svg" alt="star" width={20} height={20} />
            ))
          }
        </div>
        <p>{product.description}</p>
        <br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum iusto placeat consequatur voluptas sit mollitia ratione autem, atque sequi odio laborum, recusandae quia distinctio voluptatibus sint, quae aliquid possimus exercitationem.</p>
        <div className={classes.quantity}>
          <button onClick={decrementQuantity}>-</button>
          <input 
            type="number" 
            name="quantity" 
            value={productQuantity}
            onChange={changeQuantityHandler}
            className={classes.inputQuantity}
          />
          <button onClick={incrementQuantity}>+</button>
        </div>
        <p>Available in: {product.colors.map((color, index) => {
          if(index + 1 < product.colors.length) return (<span key={color}>{color}, </span>);
          return (<span key={color}>{color}</span>);
        })}
        </p>

        <Button btnClassName={classes.addBtn} click={addToCart} disabled={productQuantity < 1 ? true : false}>Add to cart</Button>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const res = await fetch(`https://nodejs-estore.herokuapp.com/api/products`);
  const products = await res.json();

  const paths = products.map(p => `/shop/product/${p._id}`);

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`https://nodejs-estore.herokuapp.com/api/products/${params.id}`);
  const product = await res.json();

  return {
    props: {
      product
    }
  }
}

export default product;