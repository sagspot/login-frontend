import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: '',
  token: '',
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.userDetails = action.payload.userDetails;
      state.token = action.payload.token;
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
      state.token = '';
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
