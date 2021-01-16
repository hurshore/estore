import classes from './Badge.module.css';

const badge = (props) => {
  let badgeContent;
  badgeContent = (
    <span className={classes.badgeContent}>{props.badgeContent < 99 ? props.badgeContent : '99+'}</span>
  )

  if(props.badgeContent < 1) badgeContent = null;
  return (
    <div className={classes.badge}>
      {props.children}
      {badgeContent}
    </div>
  );
}

export default badge;