import classes from './SearchHit.module.css';
import Image from 'next/image';

const Hit = ({ hit }) => {
  return (
    <div className={classes.hit}>
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