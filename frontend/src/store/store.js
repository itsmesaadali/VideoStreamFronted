// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import userProfileReducer from './features/userProfileSlice'
import { setupInterceptors } from '../utils/axiosConfig';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
  }
});

// Initialize interceptors after store creation
setupInterceptors(store);