import axios from 'axios';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { baseurl } from '../../config';
import { userActions } from '../store/user-slice';

import classes from './Login.module.css';

axios.defaults.baseURL = baseurl;

const ResetPasswordInitialized = () => {
  const [resetDone, setResetDone] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  const otpRef = useRef();
  const passwordRef = useRef();

  const userId = useSelector((state) => state.user.user);
  const submitHandler = (e) => {
    e.preventDefault();
    const otp = otpRef.current.value;
    const password = passwordRef.current.value;

    const sendData = async () => {
      dispatch(userActions.loading());
      try {
        const response = await axios.request({
          method: 'POST',
          url: `/auth/reset/${userId}`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: { otp, password },
        });

        console.log(response.data);
        dispatch(userActions.success(response.data?.message));
        setResetDone(true);
        setTimeout(() => {
          history.replace('/login');
        }, 3000);
      } catch (err) {
        console.log(err.response.data);
        if (err.response.data.message)
          dispatch(userActions.error(err.response.data.message));
        else if (err.response.data)
          dispatch(userActions.error(err.response.data));
        else dispatch(userActions.error('Something went wrong'));
      }
    };
    sendData();
  };

  const loading = useSelector((state) => state.user.loading);
  const success = useSelector((state) => state.user.success);
  const error = useSelector((state) => state.user.error);
  let alert;
  if (loading) {
    alert = <p className={classes.alert}>Loading...</p>;
  }
  if (error) {
    alert = <p className={classes.error}>{error}</p>;
  }
  if (success) {
    alert = <p className={classes.alert}>{success}</p>;
  }

  return (
    <section className={classes.auth}>
      <h1> Reset Password</h1>
      {alert}
      <form onSubmit={submitHandler}>
        {!resetDone && (
          <div className={classes.control}>
            <p>Enter the OTP sent to your email to reset your password.</p>
            <label htmlFor="otp">Enter OTP</label>
            <input type="text" id="otp" required ref={otpRef} />
            <label htmlFor="password">Enter New Password</label>
            <input type="password" id="password" required ref={passwordRef} />
          </div>
        )}
        {resetDone && <p>Redirecting to login page...</p>}
        <div className={classes.actions}>
          {!resetDone && <button>Reset Password</button>}
          <Link to="/login" className={classes.toggle}>
            Login
          </Link>
        </div>
      </form>
    </section>
  );
};

export default ResetPasswordInitialized;
