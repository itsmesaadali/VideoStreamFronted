// src/utils/axiosConfig.js
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

// Export interceptor setup function
export const setupInterceptors = (store) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { data } = await axiosInstance.post('/users/refresh-token');
          
          store.dispatch({
            type: 'auth/updateTokens',
            payload: {
              accessToken: data.accessToken,
              refreshToken: data.refreshToken
            }
          });

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          store.dispatch({ type: 'auth/logout' });
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};