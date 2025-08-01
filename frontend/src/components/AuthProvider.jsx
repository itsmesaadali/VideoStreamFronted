// src/components/AuthProvider.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, selectIsAuthenticated } from '../store/features/authSlice';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    if(!isAuthenticated){

      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return children;
};

export default AuthProvider;
