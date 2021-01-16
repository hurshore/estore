import classes from './shop.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../../components/UI/Button/Button';

const shop = ({ products }) => {
  return (
    <div className={classes.shop}>
      <h2 className={classes.header}>Products</h2>
      <div className={classes.products}>
        {
          products && products.map(product => (
            <div className={classes.product} key={product._id}>
              <Image src={product.img} alt="product.name" width={300} height={300} />
              <div className={classes.productDetails}>
                <p className={classes.productName}>{product.name}</p>
                <h3 className={classes.productPrice}>{`$${product.price}`}</h3>
                <Link href={`/shop/product/${product._id}`}>
                  <a>
                    <Button>View Product</Button>
                  </a>
                </Link>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`https://nodejs-estore.herokuapp.com/api/products`);
  const products = await res.json();

  return {
    props: {
      products
    }
  }
}

export default shop;