import classes from './Button.module.css';

const button = (props) => (
  <button 
    type={props.type} 
    className={`${props.btnClassName ? props.btnClassName : null} ${classes.btn}`} 
    onClick={props.click}
    disabled={props.disabled}
  >{props.children}</button>
)

export default button;