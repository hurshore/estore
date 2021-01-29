import { useEffect, useState } from 'react';
import classes from './Alert.module.css';

const alert = (props) => {
  const [type, setType] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      props.onClose()
    }, props.time || 3000)
    return () => clearTimeout(timeout);
  }, [props.open]);

  const getAlertType = (alertType) => {
    switch(alertType) {
      case 'info':
        setType(classes.alertInfo);
        break;
      case 'success':
        setType(classes.alertSuccess);
      default: break
    }
  }

  useEffect(() => {
    getAlertType(props.type);
  }, [])

  return (
    props.open && (
      <div className={`${classes.alert} ${type}`}>
        {props.children}
      </div>
    )
  )
}
export default alert;