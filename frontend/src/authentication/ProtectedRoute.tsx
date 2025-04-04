import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

export default function ProtectedRoute() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      console.log("Token retrieved from localStorage in ProtectedRoute:", token); // <--- ADD THIS

      if (token) {
        try {
          const response = await api.get('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Response from /api/auth/me:", response);
          setIsAuthenticated(true);
        } catch (err) {
          console.error("Error fetching /api/auth/me:", err);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          navigate('/login');
        } finally {
          setAuthChecked(true);
        }
      } else {
        setIsAuthenticated(false);
        setAuthChecked(true);
        navigate('/login');
      }
    };
    verifyAuth();
  }, [navigate]);

  if (!authChecked) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : null;
}