import axios from 'axios';
import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { baseurl } from '../../config';

import classes from './Login.module.css';
import { authActions } from '../store/auth-slice';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const sendData = async () => {
      try {
        const res = await axios.post(`${baseurl}/auth/register`, {
          name,
          username,
          email,
          password,
        });

        console.log(res.data);
        const user = {
          userDetails: res.data.user,
          token: res.data.token,
        };
        dispatch(authActions.login(user));
        history.replace('/profile');
      } catch (err) {
        console.log(err.response);
      }
    };
    sendData();
  };

  return (
    <section className={classes.auth}>
      <h1> Register</h1>
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
