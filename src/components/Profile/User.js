import classes from './Profile.module.css';

const User = (props) => {
  return (
    <div className={classes.items}>
      <span className={classes.title}>Name</span>
      <span className={classes.content}>{props.name}</span>
      <span className={classes.title}>Username</span>
      <span className={classes.content}>{props.username}</span>
      <span className={classes.title}>Email</span>
      <span className={classes.content}>{props.username}</span>
      <span className={classes.title}>Role</span>
      <span className={classes.content}>{props.role}</span>
    </div>
  );
};

export default User;
