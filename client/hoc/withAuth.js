import { useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent, props) => {
  return () => {
    const authState = useAuth();
    const router = useRouter();

    useEffect(() => {
      if(!localStorage.getItem('auth-token')) router.replace('/shop');
    }, [])

    return <WrappedComponent {...props} />
  }
}

export default withAuth;