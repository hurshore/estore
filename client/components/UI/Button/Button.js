import classes from './Button.module.css';

const button = (props) => (
  <button type={props.type} className={`${props.btnClassName} ${classes.btn}`} onClick={props.click}>{props.children}</button>
)

export default button;