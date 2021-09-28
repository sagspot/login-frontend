import { useSelector } from 'react-redux';

import classes from './Profile.module.css';
import Layout from '../UI/Layout';
import User from './User';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/user-slice';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const verifyAccount = async () => {
    try {
      dispatch(userActions.confirmAccount());
      const response = await axios.request({
        method: 'POST',
        url: `/auth/register/confirm/${user.id}`,
      });
      console.log(response);
      dispatch(userActions.success(response?.data?.message));
    } catch (err) {
      if (err.response.status === 404) {
        console.log(err.response);
        dispatch(userActions.error(err.response?.data?.error?.message));
      } else {
        dispatch(userActions.error(err.response?.data?.message));
        console.log(err.response);
      }
    }
  };

  let alert = false;
  const loading = useSelector((state) => state.user.loading);
  const success = useSelector((state) => state.user.success);
  const error = useSelector((state) => state.user.error);
  if (loading) {
    alert = <p className={classes.alert}>Sending email...</p>;
  } else if (error) {
    alert = <p className={`${classes.alert} ${classes.error}`}>{error}</p>;
  } else if (success) {
    alert = (
      <p className={classes.alert}>
        Sent! Check your email for a confirmation link
      </p>
    );
  }

  return (
    <Layout>
      <div className={classes.flex}>
        <h1>User Details</h1>
        <User
          name={user.name}
          username={user.username}
          email={user.email}
          role={user.role}
        />
        {user.isConfirmed && (
          <div className={classes.alert}>
            Congratulations. Your account is verified
          </div>
        )}
        {!user.isConfirmed && !alert && (
          <div className={`${classes.alert} ${classes.error}`}>
            Your account is not verified.{' '}
            <span onClick={verifyAccount}>
              Click here to send verification link
            </span>
          </div>
        )}
        {!user.isConfirmed && alert}
      </div>
    </Layout>
  );
};

export default Profile;
