import { useState } from 'react';
import classes from './Product.module.css';
import Image from 'next/image';
import { useDispatchCart } from '../../context/cartContext';
import * as actionTypes from '../../context/actionTypes';

const product = ({ product }) => {
  const [productQuantity, setProductQuantity] = useState(product.quantity);
  const dispatchCart = useDispatchCart();

  const incrementQuantity = () => {
    console.log('Adding to cart');
    setProductQuantity(productQuantity + 1);
    const productToAdd = {
      productId: product._id,
      productName: product.name,
      price: product.price,
      img: product.img,
      quantity: 1
    }

    dispatchCart({
      type: actionTypes.ADD_TO_CART,
      payload: productToAdd
    });
  }

  const decrementQuantity = () => {
    if(productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  }

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
        <button onClick={decrementQuantity}>-</button>
        <span>{productQuantity}</span>
        <button onClick={incrementQuantity}>+</button>
      </div>
    </div>
  )
}

export default product;