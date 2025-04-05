import { useNavigate } from 'react-router-dom';
import api from '../../api';
import AuthForm from './shared/AuthForm';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async ({ username, password }: { username: string; password: string }) => {
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);

      // Check for stored redirect location or go to dashboard
      const redirectTo = location.state?.from || '/dashboard';
      navigate(redirectTo, { replace: true });

    } catch (error) {
      return "Invalid credentials";
    }
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleSubmit}
    />
  );
}