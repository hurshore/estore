import Head from 'next/head';
import classes from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../components/UI/Button/Button';

export default function Home() {
  return (
    <div className={classes.container}>
      <Head>
        <title>Stello | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classes.main}>
        <div className={classes.heroImg}>
          <Image src="/iphone-12.png" alt="iPhone 12 mini" height={492} width={500} layout="intrinsic" />
        </div>

        <div className={classes.info}>
          <h4 className={classes.heading}>iPhone 12</h4>
          <div className={classes.highlights}>
            <h1>Blast Past Fast.</h1>
            <h1>A14 Bionic chip.</h1>
            <h1>5G Just Got Real.</h1>
          </div>
          <div className={classes.details}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc imperdiet, tortor a bibendum finibus, lorem velit finibus ipsum, ut efficitur nunc urna vitae mi. Nullam nunc eros, egestas eget sem ut, vehicula semper neque. Proin blandit, ipsum vel accumsan elementum, metus dui accumsan velit, at laoreet quam arcu at purus. Nam accumsan, ligula vel tempus bibendum.</p>
          </div>
          <Link href="/shop">
            <a>
              <Button>Discover Now</Button>
            </a>
          </Link>
        </div>
      </main>

      <div className={classes.backText}>
        <span>i</span>
        <span>P</span>
        <span>H</span>
        <span>O</span>
        <span>N</span>
        <span>E</span>
        <span>1</span>
        <span>2</span>
      </div>
    </div>
  )
}
