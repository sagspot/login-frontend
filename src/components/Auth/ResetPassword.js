import axios from 'axios';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { baseurl } from '../../config';

import classes from './Login.module.css';

const ResetPassword = () => {
  const usernameRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const sendData = async () => {
      try {
        const res = await axios.post(`${baseurl}/auth/reset`, {
          username,
        });

        console.log(res.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    sendData();
  };

  return (
    <section className={classes.auth}>
      <h1> Reset Password</h1>
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
