import '../styles/globals.css';
import Nav from '../components/Nav/Nav';
import { AuthProvider } from '../context/authContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Nav />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp
