import { useState  } from 'react';
import classes from './cart.module.css';
import Image from 'next/image';
import { useCart, useDispatchCart } from '../../context/cartContext';
import Button from '../../components/UI/Button/Button';

const cart = () => {
  const [productQuantity, setProductQuantity] = useState(1);
  const cartState = useCart();

  const dispatch = useDispatchCart();

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

  return (
    <div className={classes.cart}>
      <div className={classes.container}>
        <h2>Shopping Cart ({cartState.quantity})</h2>
        <div className={classes.row}>
          <div className={classes.productList}>
            {
              cartState.products.map(product => (
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
                    <span>{product.quantity}</span>
                    {/* <input 
                      type="number"
                      className={classes.inputQuantity}
                      value={productQuantity}
                      onChange={changeQuantityHandler}
                    /> */}
                    <button onClick={incrementQuantity}>+</button>
                  </div>
                </div>
              ))
            }
          </div>
          

          <div className={classes.summary}>
            <h2>Order Summary</h2>
            <div className={classes.orderDetails}>
              <div className={classes.subtotal}>
                <span>Subtotal</span>
                <span>US ${cartState.total}</span>
              </div>
              <div className={classes.shipping}>
                <span>Shipping</span>
                <span>US $0.00</span>
              </div>
              <hr />
              <div className={classes.total}>
                <span>
                  <h3>Total</h3>
                </span>
                <span>
                  <h3>${cartState.total}</h3>
                </span>
              </div>
              <Button btnClassName={classes.buyBtn}>BUY</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default cart;