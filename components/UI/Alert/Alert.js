import { useEffect, useState } from 'react';
import classes from './Alert.module.css';

const alert = (props) => {
  const [type, setType] = useState('');

  const getAlertType = (alertType) => {
    switch(alertType) {
      case 'info':
        setType(classes.alertInfo);
        break;
      default: break
    }
  }

  useEffect(() => {
    getAlertType(props.type)
  }, [])

  return (
    <div className={`${classes.alert} ${type}`}>
      {props.children}
    </div>
  )
}
export default alert;