import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-page">
      <h1>New Web App!</h1>
      <div className="auth-links">
        <Link to="/login" className="btn-login">Sign In</Link>
        <Link to="/register" className="btn-register">Create Account</Link>
      </div>
    </div>
  );
}