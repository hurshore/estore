import classes from './cart.module.css';
import { useCart } from '../../context/cartContext';
import Button from '../../components/UI/Button/Button';
import Product from '../../components/Product/Product';
import Link from 'next/link';

const cart = () => {
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
              <Link href="/checkout">
                <a>
                  <Button btnClassName={classes.buyBtn}>PROCEED TO CHECKOUT</Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default cart;