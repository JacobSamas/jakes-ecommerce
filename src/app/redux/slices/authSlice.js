import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // User object
  isAuthenticated: false, // Authentication status
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload; // Store user details
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null; // Clear user details
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
