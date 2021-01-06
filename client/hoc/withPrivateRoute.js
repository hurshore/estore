import { Component } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/router';

const withPrivateRoute = (WrappedComponent, props) => {
  // return class extends Component {
  //   componentDidMount() {
  //     if(!localStorage.getItem('auth-token')) router.replace('/shop');
  //   }

  //   render() {
  //     const router = useRouter();
  //     return <WrappedComponent {...this.props} />;
  //   }
  // }
  return () => {
    const authState = useAuth();
    const router = useRouter();

    useEffect(() => {
      if(!localStorage.getItem('auth-token')) router.replace('/shop');
    }, [])

    return <WrappedComponent {...props} />
  }
}

export default withPrivateRoute;