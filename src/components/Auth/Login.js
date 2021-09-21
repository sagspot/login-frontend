import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import classes from './Login.module.css';
import { baseurl } from '../../config';
import { authActions } from '../store/auth-slice';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const sendData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await axios.post(`${baseurl}/auth/login`, {
          username,
          password,
        });

        dispatch(authActions.login(res.data));
        history.replace('/profile');
      } catch (err) {
        console.log(err.response);
        setError(err.response.data);
        setIsLoading(false);
      }
    };
    sendData();
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
      <h1> Login</h1>
      {alert}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="emailorusername">Your Email or Username</label>
          <input type="text" id="emailorusername" required ref={usernameRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button>Login</button>
          <Link to="/register" className={classes.toggle}>
            Create new account
          </Link>
          or
          <Link to="/reset" className={classes.toggle}>
            Reset Password
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
