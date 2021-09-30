import { createSlice } from '@reduxjs/toolkit';

const user = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const AuthToken = localStorage.getItem('AuthToken')
  ? JSON.parse(localStorage.getItem('AuthToken'))
  : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user,
    AuthToken,
    loading: false,
    error: null,
  },
  reducers: {
    login(state, action) {
      state.AuthToken = action.payload;
    },
    user(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.AuthToken = null;
      state.error = null;
    },
    loading(state) {
      state.loading = true;
    },
    error(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
