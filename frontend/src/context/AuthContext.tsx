import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const AuthContext = createContext({
  user: null as { username: string } | null,
  loading: true,
  login: (token: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{username: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  // Use the same api instance with the interceptor
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
  });

  // Add request interceptor to include token (same as in App.tsx)
  api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/api/auth/me'); // Use the 'api' instance
        setUser(response.data);
      } catch (err) {
        setUser(null);
        // Optionally clear token and redirect to login here if needed
        // localStorage.removeItem('token');
        // navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    // The interceptor will handle setting the Authorization header for subsequent requests
    checkAuth();
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout'); // Use the 'api' instance
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);