import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import projectReducer from './slices/projectSlice.js';
import ticketReducer from './slices/ticketSlice.js';

// Central Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    tickets: ticketReducer,
  },
});

export default store;
