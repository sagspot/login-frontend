import axios from 'axios';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { baseurl } from '../../config';
import { userActions } from '../store/user-slice';

import classes from './Login.module.css';

axios.defaults.baseURL = baseurl;

const ResetPassword = () => {
  const dispatch = useDispatch();

  const usernameRef = useRef();
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();

    let email;
    let username;
    if (usernameRef.current.value.includes('@')) {
      email = usernameRef.current.value;
    } else {
      username = usernameRef.current.value;
    }

    const sendData = async () => {
      dispatch(userActions.loading());
      try {
        const response = await axios.request({
          method: 'POST',
          url: '/auth/reset',
          data: { username, email },
        });

        console.log(response.data);
        dispatch(userActions.success(response.data?.message));
        dispatch(userActions.user(response.data?.userId));
        history.push('/reset-initialized');
      } catch (err) {
        console.log(err.response);
        dispatch(userActions.error(err.response?.data));
      }
    };
    sendData();
  };

  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  let alert;
  if (loading) {
    alert = <p className={classes.alert}>Loading...</p>;
  }
  if (error) {
    alert = <p className={classes.error}>{error}</p>;
  }

  return (
    <section className={classes.auth}>
      <div className={classes.actions} style={{ margin: '0' }}>
        <Link to="/" className={classes.toggle} style={{ margin: '0' }}>
          Back to Home
        </Link>
      </div>
      <h1> Reset Password</h1>
      {alert}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="emailorusername">Your Email or Username</label>
          <input type="text" id="emailorusername" required ref={usernameRef} />
        </div>

        <div className={classes.actions}>
          <button>Reset Password</button>
          <Link to="/login" className={classes.toggle}>
            Login
          </Link>
        </div>
      </form>
    </section>
  );
};

export default ResetPassword;
