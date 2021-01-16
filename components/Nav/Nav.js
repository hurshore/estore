import classes from './Nav.module.css';
// Components
import Badge from '../UI/Badge/Badge';
import Search from '../Search/Search';
// Nextjs stuff
import ActiveLink from './ActiveLink';
import Link from 'next/link';
import Image from 'next/image';
// Context
import { useAuth } from '../../context/authContext';
import { useCart } from '../../context/cartContext';

const nav = () => {
  const authState = useAuth();
  const cartState = useCart();

  return (
    <nav className={classes.nav}>
      <div className={classes.logo}>
        <Link href="/">
          <a>
            <h2>Stello</h2>
          </a>
        </Link>
      </div>
      <ul className={classes.navLinks}>
        <li>
          <ActiveLink activeClassName={classes.active} href="/">
            <a>Home</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink activeClassName={classes.active} href="/shop">
            <a>Shop</a>
          </ActiveLink>
        </li>
        {!authState.token ? (
          <li>
            <ActiveLink activeClassName={classes.active} href="/login">
              <a>Login</a>
            </ActiveLink>
          </li>
        ) : (
          <Link href="/logout">
            <a>Logout</a>
          </Link>
        )}
      </ul>
      <div className={classes.shortcut}>
        <div>
          {/* <Image src="/search.svg" alt="search" width={20} height={20} /> */}
          <Search />
        </div>
        <div className={classes.cart}>
          <Link href="/cart">
            <a>
              <Badge badgeContent={cartState.quantity}>
                <Image src="/shopping-cart.svg" alt="cart" width={20} height={20} />
              </Badge>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default nav;