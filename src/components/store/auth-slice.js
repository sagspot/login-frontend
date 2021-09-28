import { createSlice } from '@reduxjs/toolkit';

const user = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user,
    loading: false,
    error: null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    logout(state) {
      state.user = null;
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
