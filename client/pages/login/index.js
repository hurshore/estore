import { useState } from 'react';
import classes from './login.module.css';
import Button from '../../components/UI/Button/Button';
import Link from 'next/link'

const login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    error: {}
  })

  const inputChangeHandler = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }


  const loginHandler = (event) => {
    event.preventDefault();
    console.log('Attemting login');
  }

  return (
    <div className={classes.login}>
      <h2 className={classes.header}>Login</h2>
      <form onSubmit={loginHandler} className={classes.loginForm}>
        <div className={classes.formGroup}>
          <label>Email</label>
          <input 
            type="email" 
            name="email"
            value={state.email}
            onChange={inputChangeHandler}
          />
        </div>
        <div className={classes.formGroup}>
          <label>Password</label>
          <input 
            type="password" 
            name="password"
            value={state.password}
            onChange={inputChangeHandler}
          />
        </div>
        <Button type="submit" btnClassName={classes.submitBtn}>Log In</Button>
        <p className={classes.signup}>Don't have an account yet? <Link href="/signup"><a>Sign up</a></Link></p>
      </form>
      
    </div>
  )
}

export default login;