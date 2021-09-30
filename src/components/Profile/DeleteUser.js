import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { baseurl } from '../../config';
import { authActions } from '../store/auth-slice';
import { userActions } from '../store/user-slice';

axios.defaults.baseURL = baseurl;

const DeleteUser = () => {
  const user = useSelector((state) => state.auth.user);
  const AuthToken = useSelector((state) => state.auth.AuthToken);
  const dispatch = useDispatch();

  const deleteAccountHandler = async (e) => {
    e.preventDefault();
    const deleteAccount = prompt(
      'Enter your username in lowercase to delete your account'
    );
    if (deleteAccount !== user.username) return alert('Operation cancelled');

    try {
      dispatch(userActions.loading());
      const response = await axios.request({
        method: 'DELETE',
        url: `/${user.id}`,
        headers: {
          Authorization: `Bearer ${AuthToken}`,
        },
      });
      console.log(response);
      dispatch(userActions.success(response?.data?.message));
      setTimeout(() => {
        dispatch(authActions.logout());
      }, 5000);
    } catch (err) {
      console.log(err.response);
      if (err.response?.data?.error?.message)
        dispatch(userActions.error(err.response?.data?.error?.message));
      else if (err.response?.data?.message)
        dispatch(userActions.error(err.response?.data?.message));
      else dispatch(userActions.error('Something went wrong'));
    }
  };

  let alert;
  const loading = useSelector((state) => state.user.loading);
  const success = useSelector((state) => state.user.success);
  const error = useSelector((state) => state.user.error);
  if (loading)
    alert = (
      <p className="alert alert-primary py-1">
        Deleting account. Please wait...
      </p>
    );
  if (success)
    alert = (
      <>
        <p className="alert alert-warning py-1">{success} </p>
        <p className="alert alert-info py-1"> Logging you out...</p>
      </>
    );
  if (error) alert = <p className="alert alert-danger py-1">{error}</p>;

  return (
    <div className="card-body">
      <h3>Delete user</h3>
      <hr />
      {alert}
      <button
        type="button"
        className="btn btn-danger"
        onClick={deleteAccountHandler}
      >
        Delete user
      </button>
    </div>
  );
};

export default DeleteUser;
