import classes from './Nav.module.css';
// Components
import Badge from '../UI/Badge/Badge';
// Nextjs stuff
import ActiveLink from './ActiveLink';
import Link from 'next/link';
import Image from 'next/image';
// Context
import { useAuth } from '../../context/authContext';

const nav = () => {
  const authState = useAuth();

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
        {!authState.token && (
          <li>
            <ActiveLink activeClassName={classes.active} href="/login">
              <a>Login</a>
            </ActiveLink>
          </li>
        )}
      </ul>
      <div className={classes.shortcut}>
        <div>
          <Image src="/search.svg" alt="search" width={20} height={20} />
        </div>
        <div>
          <Link href="/cart">
            <a>
              <Badge badgeContent={4}>
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