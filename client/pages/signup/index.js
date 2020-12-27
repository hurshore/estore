import { useState } from 'react';
import classes from './signup.module.css';
import Button from '../../components/UI/Button/Button';
import Link from 'next/link'

const signup = () => {
  const [state, setState] = useState({
    fname: '',
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


  const signupHandler = (event) => {
    event.preventDefault();
    console.log('Attemting signup');
  }

  return (
    <div className={classes.signup}>
      <h2 className={classes.header}>Signup</h2>
      <form onSubmit={signupHandler} className={classes.signupForm}>
        <div className={classes.formGroup}>
          <label>Full Name</label>
          <input 
            type="text" 
            name="fname"
            value={state.fname}
            onChange={inputChangeHandler}
          />
        </div>
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

        <p className={classes.login}>Already have an account? <Link href="/login"><a>Log in</a></Link></p>
      </form>
      
    </div>
  )
}

export default signup;