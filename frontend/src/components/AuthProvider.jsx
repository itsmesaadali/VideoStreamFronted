// src/components/AuthProvider.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../store/features/authSlice';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return children;
};

export default AuthProvider;
