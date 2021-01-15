import classes from './SearchHit.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Hit = ({ hit }) => {
  const router = useRouter();
  const clicked = (id) => {
    router.push(`/shop/product/${id}`);
  }
  
  return (
    <div className={classes.hit} onClick={() => clicked(hit.objectID)}>
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