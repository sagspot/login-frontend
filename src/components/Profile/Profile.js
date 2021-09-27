import { useSelector } from 'react-redux';

import classes from './Profile.module.css';
import Layout from '../UI/Layout';
import User from './User';
import { Link } from 'react-router-dom';

const Profile = () => {
  const auth = useSelector((state) => state.userDetails);

  const accountIsVerified = true;

  return (
    <Layout>
      <div className={classes.flex}>
        <h1>User Details</h1>
        <User
          name={auth.name}
          username={auth.username}
          email={auth.email}
          role={auth.role}
        />
        {accountIsVerified ? (
          <div className={classes.alert}>
            Congratulations. Your account is verified
          </div>
        ) : (
          <div className={`${classes.alert} ${classes.error}`}>
            Your account is not verified.{' '}
            <Link to="/profile">Click here to Verify</Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
