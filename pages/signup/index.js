import { useState } from 'react';
import classes from './signup.module.css';
import Button from '../../components/UI/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Spinner from '../../components/UI/Spinner/Spinner';
import Head from 'next/head';
import { useAuth, useDispatchAuth } from '../../context/authContext';
import * as actionTypes from '../../context/actionTypes';

const signup = () => {
  const [state, setState] = useState({
    fname: '',
    email: '',
    password: '',
    error: null,
    loading: false
  })

  const router = useRouter();
  const auth = useAuth();
  const dispatch = useDispatchAuth();

  const inputChangeHandler = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }


  const signupHandler = async (event) => {
    event.preventDefault();
    setState({ ...state, loading: true })
    const details = {
      name: state.fname,
      email: state.email,
      password: state.password
    }

    try {
      // Attempt log in
      const res = await fetch('https://nodejs-estore.herokuapp.com/api/user/signup', {
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
      dispatch({ type: actionTypes.SET_TOKEN, payload: data });
      setState({ ...state, loading: false, error: null });
      router.push(auth.authRedirectPath);
    } catch(err) {
      console.log(err);
      setState({ ...state, loading: false, error: err.error });
    }
  }

  return (
    <div className={classes.signup}>
      <Head>
        <title>Stello | Sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={classes.container}>
        <h2 className={classes.header}>Signup</h2>
        {
          state.error && (<p className={classes.error}>{state.error}</p>)
        }
        <form onSubmit={signupHandler} className={classes.signupForm}>
          <div className={classes.formGroup}>
            <label>Full Name</label>
            <input 
              type="text" 
              name="fname"
              value={state.fname}
              required
              onChange={inputChangeHandler}
            />
          </div>
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
            Sign up
            {
              state.loading && (
                <span className={classes.loader}>
                  <Spinner />
                </span>
              )
            }
          </Button>
            
          <p className={classes.login}>Already have an account? <Link href="/login"><a>Log in</a></Link></p>
        </form>
      </div>
    </div>
  )
}

export default signup;