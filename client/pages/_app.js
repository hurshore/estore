import '../styles/globals.css';
import Layout from '../components/Layout/Layout';
import { AuthProvider } from '../context/authContext';
import { CartProvider } from '../context/cartContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp
