import axios from 'axios';
import { useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { baseurl } from '../../config';

import classes from './Login.module.css';
import { authActions } from '../store/auth-slice';
import { useSelector } from 'react-redux';

axios.defaults.baseURL = baseurl;

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordRptRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordRpt = passwordRptRef.current.value;
    if (password !== passwordRpt)
      return dispatch(authActions.error('Passwords do not match'));

    const sendRequest = async () => {
      try {
        const response = await axios.request({
          method: 'POST',
          url: '/auth/register',
          data: { name, username, email, password },
        });
        dispatch(authActions.user(response.data?.user));
        dispatch(authActions.login(response.data?.AuthToken));
        localStorage.setItem('user', JSON.stringify(response.data?.user));
        localStorage.setItem(
          'AuthToken',
          JSON.stringify(response.data?.AuthToken)
        );
      } catch (err) {
        console.log(err.response);
        if (err.response.status === 404)
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
      <h1> Register</h1>
      {alert}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="username">Your Username</label>
          <input type="text" id="username" required ref={usernameRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" required ref={nameRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="passwordRpt">Confirm Password</label>
          <input
            type="password"
            id="passwordRpt"
            required
            ref={passwordRptRef}
          />
        </div>
        <div className={classes.actions}>
          <button>Register</button>
          <Link to="/login" className={classes.toggle}>
            Login
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
