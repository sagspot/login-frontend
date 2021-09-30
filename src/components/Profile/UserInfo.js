import axios from 'axios';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { baseurl } from '../../config';
import { authActions } from '../store/auth-slice';

axios.defaults.baseURL = baseurl;

const UserInfo = (props) => {
  const [editForm, setEditForm] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const AuthToken = useSelector((state) => state.auth.AuthToken);
  const dispatch = useDispatch();
  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setEditForm(false);
    const name = nameRef.current.value;
    const username = usernameRef.current.value;
    const email = emailRef.current.value;

    const sendRequest = async () => {
      dispatch(authActions.loading());
      try {
        const response = await axios.request({
          method: 'PATCH',
          url: `/${user.id}`,
          headers: {
            Authorization: `Bearer ${AuthToken}`,
          },
          data: { name, username, email },
        });
        console.log(response);
        setUpdateSuccess((prevState) => true);
        dispatch(authActions.user(response.data.user));
        localStorage.setItem('user', JSON.stringify(response.data?.user));
      } catch (err) {
        console.log(err.response);
        if (err.response.data.message)
          dispatch(authActions.error(err.response.data.message));
        else if (err.response.data)
          dispatch(authActions.error(err.response.data));
        else dispatch(authActions.error('Something went wrong'));
      }
    };

    sendRequest();
  };

  const editSettingsHandler = (e) => {
    e.preventDefault();
    setEditForm(true);
  };

  const cancelEditSettingsHandler = (e) => {
    e.preventDefault();
    setEditForm(false);
  };

  let alert;
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  if (loading)
    alert = (
      <p className="alert alert-primary py-1">
        Updating account. Please wait...
      </p>
    );
  if (updateSuccess)
    alert = <p className="alert alert-success py-1">Account details updated</p>;
  if (error) alert = <p className="alert alert-danger py-1">{error}</p>;

  return (
    <form onSubmit={formSubmitHandler} className="row g-3">
      <div className="col-4">
        <label htmlFor="name" className="form-label">
          Name
        </label>
      </div>
      <div className="col-1">:</div>
      <div className="col-7">
        <input
          type="text"
          name="name"
          id="name"
          ref={nameRef}
          defaultValue={props.name}
          className="form-control form-control-sm text-pri my-fw-semibold bg-pri-hover"
          required
          readOnly={!editForm}
        />
      </div>

      <div className="col-4">
        <label htmlFor="username" className="form-label">
          Username
        </label>
      </div>
      <div className="col-1">:</div>
      <div className="col-7">
        <input
          type="text"
          name="username"
          id="username"
          ref={usernameRef}
          defaultValue={props.username}
          className="form-control form-control-sm text-pri my-fw-semibold bg-pri-hover"
          required
          readOnly={!editForm}
        />
      </div>

      <div className="col-4">
        <label htmlFor="email" className="form-label">
          Email
        </label>
      </div>
      <div className="col-1">:</div>
      <div className="col-7">
        <input
          type="email"
          name="email"
          id="email"
          ref={emailRef}
          defaultValue={props.email}
          className="form-control form-control-sm text-pri my-fw-semibold bg-pri-hover"
          required
          readOnly={!editForm}
        />
      </div>

      <div className="col-4">
        <label htmlFor="role" className="form-label">
          Role
        </label>
      </div>
      <div className="col-1">:</div>
      <div className="col-7">
        <select
          name="role"
          id="role"
          className="form-control form-control-sm text-pri my-fw-semibold bg-pri-hover"
          required
          readOnly
        >
          <option defaultValue>{props.role}</option>
        </select>
      </div>

      {alert}

      <div className={editForm ? 'd-block' : 'd-none'}>
        <div className="d-md-flex justify-content-center">
          <button
            type="submit"
            className="d-block mt-3 mx-auto mx-md-2 btn btn-primary px-5 text-white"
          >
            Save
          </button>
          <button
            type="button"
            onClick={cancelEditSettingsHandler}
            className="d-block mt-3 mx-auto mx-md-2 btn btn-secondary px-5 text-white"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className={editForm ? 'd-none' : 'd-block'}>
        <button
          type="button"
          onClick={editSettingsHandler}
          className="d-block mt-3 mx-auto mx-md-2 btn btn-secondary px-5 text-white"
        >
          Edit Settings
        </button>
      </div>
    </form>
  );
};

export default UserInfo;
