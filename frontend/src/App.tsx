import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './authentication/Login';
import ProtectedRoute from './authentication/ProtectedRoute';
import axios from 'axios';
import './App.css';
import './styles.css';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

function HomePage() {
  const [getResponse, setGetResponse] = useState('');
  const [postResponse, setPostResponse] = useState('');
  const [error, setError] = useState('');

  const handleGet = async () => {
    try {
      const response = await api.get('/api/home/hello');
      setGetResponse(response.data);
      setError('');
    } catch (err) {
      setError(`GET Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handlePost = async () => {
    try {
      const response = await api.post('/api/home/hello', { message: 'Hello from frontend!' });
      setPostResponse(response.data);
      setError('');
    } catch (err) {
      setError(`POST Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Spring Boot Integration</h1>
        
        <div className="request-section">
          <button onClick={handleGet}>Test GET Request</button>
          {getResponse && <p>GET Response: {getResponse}</p>}
        </div>

        <div className="request-section">
          <button onClick={handlePost}>Test POST Request</button>
          {postResponse && <p>POST Response: {postResponse}</p>}
        </div>

        <div className="auth-links">
          <Link to="/register" className="auth-link">Register</Link>
          {/* Add other links as needed */}
        </div>

        {error && <div className="error">{error}</div>}
      </header>
    </div>
  );
}

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      setSuccess(true);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Registration</h1>
        
        {success ? (
          <div className="success-message">
            <p>Registration successful!</p>
            <Link to="/">Return to Home</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
            
            <button type="submit">Register</button>
            {error && <div className="error">{error}</div>}
            <Link to="/">Back to Home</Link>
          </form>
        )}
      </header>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          {/* Add other protected routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;