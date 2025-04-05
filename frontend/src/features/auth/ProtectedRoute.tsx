import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Only protect routes that aren't whitelisted
  const publicRoutes = ['/', '/login', '/register'];
  if (!token && !publicRoutes.includes(location.pathname)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}