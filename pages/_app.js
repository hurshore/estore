import '../styles/globals.css';
import Layout from '../components/Layout/Layout';
import { AuthProvider } from '../context/authContext';
import { CartProvider } from '../context/cartContext';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom'
const searchClient = algoliasearch('FLFRV5A174', 'b60984d314fa8bd74882206917aa0f7c');

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <InstantSearch
            indexName='products'
            searchClient={searchClient}
          >
            <Layout>
              
                <Component {...pageProps} />
            </Layout>
          </InstantSearch>
        </CartProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp
