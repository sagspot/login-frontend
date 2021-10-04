import { useSelector } from 'react-redux';

import classes from './Profile.module.css';
import Layout from '../UI/Layout';
import UserInfo from './UserInfo';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/user-slice';
import DeleteUser from './DeleteUser';
import { useEffect } from 'react';
import { authActions } from '../store/auth-slice';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const AuthToken = useSelector((state) => state.auth.AuthToken);
  const dispatch = useDispatch();

  const verifyAccount = async () => {
    try {
      dispatch(userActions.loading());
      const response = await axios.request({
        method: 'GET',
        url: `/auth/register/confirm/${user.id}`,
        headers: {
          Authorization: `Bearer ${AuthToken}`,
        },
      });
      dispatch(userActions.success(response?.data?.message));
    } catch (err) {
      console.log(err.response);
      if (err.response?.data?.error?.message)
        dispatch(userActions.error(err.response?.data?.error?.message));
      else if (err.response?.data?.message)
        dispatch(userActions.error(err.response?.data?.message));
      else dispatch(userActions.error('Something went wrong'));
    }
  };

  useEffect(() => {
    const userProfile = async () => {
      try {
        const response = await axios.request({
          method: 'GET',
          url: `/${user.id}`,
          headers: {
            Authorization: `Bearer ${AuthToken}`,
            'Content-Type': 'application/json',
          },
        });

        const {
          _id: id,
          name,
          username,
          email,
          role,
          isConfirmed,
        } = response?.data?.user;
        const userData = { id, name, username, email, role, isConfirmed };
        dispatch(authActions.user(userData));
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (err) {
        console.log(err.response);
        if (err?.response?.data?.message) {
          dispatch(authActions.error(err.response.data.message));
        } else if (err?.response?.data) {
          dispatch(authActions.error(err.response?.data));
        } else dispatch(authActions.error('Something went wrong'));
      }
    };

    userProfile();
  }, []);

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
      <div className=" " style={{ background: '#f7fcfc' }}>
        <div className="container py-5">
          <h1>Profile</h1>
          <p>Your personal Information</p>
          <div className="my-2">
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
          <div className="card">
            <div className="card-body">
              <h3>Personal Information</h3>
              <hr />
              <UserInfo
                name={user.name}
                username={user.username}
                email={user.email}
                role={user.role}
              />
            </div>
          </div>
          <div className="my-4">
            <h3>Danger Zone</h3>
            <p>Irreversible and destructive actions</p>
          </div>
          <div className="card">
            <DeleteUser />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
