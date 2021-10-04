import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { baseurl } from '../../config';
import { authActions } from '../store/auth-slice';

axios.defaults.baseURL = baseurl;

const useAxios = (params) => {
  const AuthToken = useSelector((state) => state.auth.AuthToken);
  const dispatch = useDispatch();

  const sendRequest = async () => {
    dispatch(authActions.loading());
    let success;
    try {
      const response = await axios.request({
        method: params.method,
        url: params.url,
        headers: {
          Authorization: AuthToken ? `Bearer ${AuthToken}` : null,
          'Content-Type': 'application/json',
        },
        data: params.data ? params.data : null,
      });
      success = true;
      return { success, response };
    } catch (err) {
      success = false;
      const error = err?.response;
      return { success, error };
    }
  };

  sendRequest();
};

export default useAxios;
