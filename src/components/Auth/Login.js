import { useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Login.module.css';
import { baseurl } from '../../config';
import { authActions } from '../store/auth-slice';

axios.defaults.baseURL = baseurl;

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    let email;
    let username;
    if (usernameRef.current.value.includes('@')) {
      email = usernameRef.current.value.trim().toLowerCase();
    } else {
      username = usernameRef.current.value.trim().toLowerCase();
    }
    const password = passwordRef.current.value;

    const sendRequest = async () => {
      dispatch(authActions.loading());
      try {
        const response = await axios.request({
          method: 'POST',
          url: '/auth/login',
          data: { username, email, password },
        });
        dispatch(authActions.user(response.data?.user));
        localStorage.setItem('user', JSON.stringify(response.data?.user));
        dispatch(authActions.login(response.data?.AuthToken));
        localStorage.setItem(
          'AuthToken',
          JSON.stringify(response.data?.AuthToken)
        );
      } catch (err) {
        console.log(err.response);
        if (err.response?.status === 404)
          dispatch(authActions.error('Something went wrong'));
        else dispatch(authActions.error(err.response?.data));
      }
    };

    sendRequest();
  };

  const AuthToken = useSelector((state) => state.auth.AuthToken);
  useEffect(() => {
    if (AuthToken) {
      history.push('/profile');
    }
  }, [history, AuthToken]);

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

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
