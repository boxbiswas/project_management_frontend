import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';

// Central Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
