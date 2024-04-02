import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth, AuthContextType } from './useAuth';

const ProtectedRoute: React.FC = () => {
  const { isLoggedIn }: AuthContextType = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
