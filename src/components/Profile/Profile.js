import { useSelector } from 'react-redux';

import classes from './Profile.module.css';
import Layout from '../UI/Layout';
import User from './User';

const Profile = () => {
  const auth = useSelector((state) => state.userDetails);

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
      </div>
    </Layout>
  );
};

export default Profile;
