import '../styles/globals.css';
import Layout from '../components/Layout/Layout';
import { AuthProvider } from '../context/authContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  )
}

export default MyApp
