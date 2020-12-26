import classes from './Button.module.css';

const button = (props) => (
  <button type={props.type} className={`${classes.btn} ${props.btnClassName}`} onClick={props.click}>{props.children}</button>
)

export default button;