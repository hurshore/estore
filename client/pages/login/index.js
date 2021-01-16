import { useState } from 'react';
import classes from './login.module.css';
import Button from '../../components/UI/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useAuth, useDispatchAuth } from '../../context/authContext';
import * as actionTypes from '../../context/actionTypes';

const login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    error: null,
    loading: false
  })

  const auth = useAuth();
  const dispatch = useDispatchAuth();
  const router = useRouter();

  const inputChangeHandler = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }


  const loginHandler = async (event) => {
    event.preventDefault();
    setState({ ...state, loading: true });
    const details = {
      email: state.email,
      password: state.password
    }

    try {
      // Attempt log in
      const res = await fetch('https://nodejs-estore.herokuapp.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(details)
      })

      // Check if response is ok and throw error if not
      if(!res.ok) {
        const error = await res.clone().json();
        throw error;
      }

      const data = await res.json();
      console.log(data);
      dispatch({ type: actionTypes.SET_TOKEN, payload: data })
      setState({ ...state, loading: false, error: null });
      router.push(auth.authRedirectPath);
    } catch(err) {
      console.log(err);
      setState({ ...state, loading: false, error: err.error });
    }
  }

  return (
    <div className={classes.login}>
      <div className={classes.container}>
        <h2 className={classes.header}>Login</h2>
        {
          state.error && (<p className={classes.error}>{state.error}</p>)
        }
        <form onSubmit={loginHandler} className={classes.loginForm}>
          <div className={classes.formGroup}>
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              value={state.email}
              required
              onChange={inputChangeHandler}
            />
          </div>
          <div className={classes.formGroup}>
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              value={state.password}
              required
              onChange={inputChangeHandler}
            />
          </div>
          <Button 
            type="submit" 
            btnClassName={classes.submitBtn} 
            disabled={state.loading ? true : false}
          >
            Log In
            {
              state.loading && (
                <span className={classes.loader}>
                  <Spinner />
                </span>
              )
            }
          </Button>
          <p className={classes.signup}>Don't have an account yet? <Link href="/signup"><a>Sign up</a></Link></p>
        </form>
      </div>
    </div>
  )
}

export default login;