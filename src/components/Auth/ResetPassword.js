import axios from 'axios';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { baseurl } from '../../config';

import classes from './Login.module.css';

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetInitiated, setResetInitiated] = useState(false);
  const [userId, setUserId] = useState('');
  const [resetDone, setResetDone] = useState(false);

  const usernameRef = useRef();
  const otpRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!resetInitiated) {
      const username = usernameRef.current.value;
      const sendData = async () => {
        setIsLoading(true);
        setError('');
        try {
          const res = await axios.post(`${baseurl}/auth/reset`, {
            username,
          });

          console.log(res.data);

          setIsLoading(false);
          setResetInitiated(true);
          setUserId(res.data.resetUser.userId);
        } catch (err) {
          setIsLoading(false);
          setError(err.response.data);
          console.log(err.response);
        }
      };
      sendData();
    } else {
      const otp = otpRef.current.value;
      const password = passwordRef.current.value;

      const sendData = async () => {
        setIsLoading(true);
        setError('');
        try {
          const res = await axios.post(`${baseurl}/auth/reset/${userId}`, {
            otp,
            password,
          });

          setIsLoading(false);
          setResetDone(true);

          console.log(res.data);
        } catch (err) {
          setIsLoading(false);
          setError(err.response.data);
          console.log(err.response);
        }
      };
      sendData();
    }
  };

  let alert;
  if (isLoading) {
    alert = <p className={classes.alert}>Loading...</p>;
  }
  if (error) {
    alert = <p className={classes.error}>{error}</p>;
  }

  return (
    <section className={classes.auth}>
      <h1> Reset Password</h1>
      {alert}
      <form onSubmit={submitHandler}>
        {!resetInitiated && (
          <div className={classes.control}>
            <label htmlFor="emailorusername">Your Email or Username</label>
            <input
              type="text"
              id="emailorusername"
              required
              ref={usernameRef}
            />
          </div>
        )}
        {resetInitiated && !resetDone && (
          <div className={classes.control}>
            <p>
              Password reset Initiated. Enter the OTP sent to your email to
              reset your password.
            </p>
            <label htmlFor="otp">Enter OTP</label>
            <input type="text" id="otp" required ref={otpRef} />
            <label htmlFor="password">Enter New Password</label>
            <input type="password" id="password" required ref={passwordRef} />
          </div>
        )}
        {resetInitiated && resetDone && (
          <p>Password succesfully reset. Login to your account</p>
        )}
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

export default ResetPassword;
