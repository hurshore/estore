import classes from './Button.module.css';

const button = (props) => (
  <button className={classes.btn}>{props.children}</button>
)

export default button;