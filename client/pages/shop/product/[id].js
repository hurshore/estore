import classes from './product.module.css';
import Image from 'next/image';
import Button from '../../../components/UI/Button/Button';
import { useState } from 'react';

const product = ({ product }) => {
  const [productQuantity, setProductQuantity] = useState(1);
  const productStars = Math.round(product.starrating);

  const changeQuantityHandler = (event) => {
    setProductQuantity(event.target.value);
  }

  const incrementQuantity = () => {
    setProductQuantity(productQuantity + 1);
  }

  const decrementQuantity = () => {
    if(productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  }

  const addToCart = () => {
    
  }

  return (
    <div className={classes.product}>
      <div className={classes.productImage}>
        <Image src={product.img} alt="product" width={250} height={300} />
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

        <Button btnClassName={classes.addBtn} click={addToCart}>Add to cart</Button>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const res = await fetch(`http://localhost:5000/api/products`);
  const products = await res.json();

  const paths = products.map(p => `/shop/product/${p._id}`);

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:5000/api/products/${params.id}`);
  const product = await res.json();

  return {
    props: {
      product
    }
  }
}

export default product;