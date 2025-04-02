import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from './AuthService';

const ProtectedRoute: React.FC = () => {
  const user = getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;