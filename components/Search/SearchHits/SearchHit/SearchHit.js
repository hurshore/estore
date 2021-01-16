import classes from './SearchHit.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Hit = ({ hit, clicked }) => {
  const router = useRouter();
  const redirectToProduct = (id) => {
    router.push(`/shop/product/${id}`);
    clicked();
  }

  return (
    <div className={classes.hit} onClick={() => redirectToProduct(hit.objectID)}>
      <div className={classes.image}>
        <Image src={hit.img} alt="product" width={40} height={40} />
      </div>
      <div className={classes.details}>
        <p className={classes.name}>{hit.name}</p>
        <p className={classes.price}>${hit.price}</p>
      </div>
    </div>
  )
}

export default Hit;