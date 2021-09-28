import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { baseurl } from '../../config';
import { authActions } from '../store/auth-slice';

axios.defaults.baseURL = baseurl;

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [resData, setResData] = useState(null);
  const [error, setError] = useState(null);

  const sendRequest = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.request(params);
      const data = await res?.data;

      setResData(data);
    } catch (err) {
      const error = err?.response;
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, resData, error };
};

export default useAxios;

// dispatch(authActions.login(res.data));
// history.replace('/profile');
// setLoading(false);
