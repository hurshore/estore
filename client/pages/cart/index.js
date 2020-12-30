import { useState  } from 'react';
import classes from './cart.module.css';
import Image from 'next/image';
import { useCart } from '../../context/cartContext';
import Button from '../../components/UI/Button/Button';
import Product from '../../components/Product/Product';

const cart = () => {
  const [productQuantity, setProductQuantity] = useState(1);
  const cartState = useCart();

  return (
    <div className={classes.cart}>
      <div className={classes.container}>
        <h2>Shopping Cart ({cartState.quantity})</h2>
        <div className={classes.row}>
          <div className={classes.productList}>
            {
              cartState.products.map(product => <Product key={product._id} product={product} />)
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