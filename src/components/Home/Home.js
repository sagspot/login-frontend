import { Link } from 'react-router-dom';
import classes from './Home.module.css';

const Home = () => {
  return (
    <section className={classes.section}>
      <div>
        <h3>Welcome to Sagpot Login System</h3>
        <p>Click the button below to visit your dashboard and explore</p>
        <p>
          If you do not have an account, feel free to create one so you can
          explore the system's capabilities
        </p>
        <Link to="/profile">Dashboard</Link>
      </div>
    </section>
  );
};

export default Home;
