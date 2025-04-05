import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-layout">
      <header className="app-header">
        <Link to="/" className="app-logo">Home</Link>
        <nav>
          {user && (
            <button onClick={logout}>Logout</button>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}