import { useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import classes from './Profile.module.css';
import Layout from '../UI/Layout';
import { baseurl } from '../../config';

const UpdateProfile = () => {
  const userDetails = useSelector((state) => state.userDetails);
  const token = useSelector((state) => state.token);

  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredUsername = usernameRef.current.value;
    const enteredEmail = emailRef.current.value;

    console.log(enteredName, enteredEmail, enteredUsername);
    const updateData = async () => {
      try {
        const res = await axios({
          method: 'patch',
          url: `${baseurl}/${userDetails.id}`,
          data: {
            name: enteredName,
            username: enteredUsername,
            email: enteredEmail,
          },
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(res);
      } catch (err) {
        console.log(err.response);
      }
    };

    updateData();
  };

  return (
    <Layout>
      <div className={classes.flex}>
        <h1>Update profile</h1>
        <form onSubmit={submitHandler} className={classes.items}>
          <label htmlFor="name" className={classes.title}>
            Name
          </label>
          <input type="text" name="name" id="name" ref={nameRef} />
          <label htmlFor="username" className={classes.title}>
            Username
          </label>
          <input type="text" name="username" id="username" ref={usernameRef} />
          <label htmlFor="email" className={classes.title}>
            Email
          </label>
          <input type="email" name="email" id="email" ref={emailRef} />

          <input type="submit" value="Submit" />
        </form>
      </div>
    </Layout>
  );
};

export default UpdateProfile;
