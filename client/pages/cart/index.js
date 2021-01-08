import classes from './cart.module.css';
import { useCart } from '../../context/cartContext';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Product from '../../components/Product/Product';
import Button from '../../components/UI/Button/Button';
import Link from 'next/link';

const cart = () => {
  const cartState = useCart();

  return (
    <div className={classes.cart}>
      <div className={classes.container}>
        <h2>Shopping Cart ({cartState.quantity})</h2>
        <div className={classes.row}>
          <div className={classes.productList}>
            {cartState.products.length > 0 ?
              cartState.products.map(product => <Product key={product._id} product={product} />) :
              (
                <div className={classes.empty}>
                  <p>Your cart is empty, fill it up!</p>
                  <Link href="/shop">
                    <a>
                      <Button>Back to Shop</Button>
                    </a>
                  </Link>
                </div>
              )
            }
          </div>
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}

export default cart;