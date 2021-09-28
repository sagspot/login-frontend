import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    confirmAccount(state) {
      state.loading = true;
    },
    success(state, action) {
      state.loading = false;
      state.success = action.payload;
      state.error = null;
    },
    error(state, action) {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
