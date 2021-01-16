import classes from './OrderSummary.module.css';
import * as actionTypes from '../../context/actionTypes';
import { useCart } from '../../context/cartContext';
import { useAuth, useDispatchAuth } from '../../context/authContext';
import { useRouter } from 'next/router';
import Button from '../UI/Button/Button';

const orderSummary = () => {
  const cartState = useCart();
  const authState = useAuth();
  const router = useRouter();
  const dispatchAuth = useDispatchAuth();

  const handleRedirect = (e) => {
    e.preventDefault();
    if(authState.token && cartState.total > 0) {
      router.push('/checkout');
    } else {
      dispatchAuth({
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: '/checkout'
      })
      router.push('/login');
    }
  }

  return (
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
          <a href="/checkout" onClick={handleRedirect}>
            <Button btnClassName={classes.buyBtn} disabled={cartState.products.length < 1}>CHECKOUT</Button>
          </a>
      </div>
    </div>
  )
}

export default orderSummary;