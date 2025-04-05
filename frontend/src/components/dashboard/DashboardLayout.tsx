// DashboardLayout.tsx
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api';

interface User {
  username: string;
  email: string;
}

const DashboardLayout = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/api/auth/me');
        setUser(response.data);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post('/api/auth/logout');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">Cilantro</h1>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/accounts"
                className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                Accounts
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/transactions"
                className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                Transactions
              </Link>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;