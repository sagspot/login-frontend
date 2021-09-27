import { Link } from 'react-router-dom';
import classes from './NotFound.module.css';

const NotFound = () => {
  return (
    <section className={classes.section}>
      <div>
        <h3>Page Not Found</h3>
        <p>Oops!!! The link you followed is either broken or doens't exist.</p>
        <Link to="/">Back to Home</Link>
      </div>
    </section>
  );
};

export default NotFound;
