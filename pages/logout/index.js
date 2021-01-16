import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatchAuth } from '../../context/authContext';
import { useDispatchCart } from '../../context/cartContext';
import * as actionTypes from '../../context/actionTypes';

const logout = () => {
  const router = useRouter();
  const dispatchAuth = useDispatchAuth();
  const dispatchCart = useDispatchCart();

  useEffect(() => {
    dispatchAuth({
      type: actionTypes.LOGOUT,
    })
    dispatchCart({
      type: actionTypes.LOGOUT
    })
    router.push('/login');
  }, [])

  return <div></div>
}

export default logout;