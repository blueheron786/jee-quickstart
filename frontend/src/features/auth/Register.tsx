import { useNavigate } from 'react-router-dom';
import api from '../../api';
import AuthForm from './shared/AuthForm';

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (data: { username: string; email: string; password: string }) => {
    try {
      await api.post('/auth/register', data);
      navigate('/login', { state: { success: true } });
    } catch (error) {
      return error.response?.data?.message || "Registration failed";
    }
  };

  return (
    <AuthForm
      type="register"
      onSubmit={handleSubmit}
    />
  );
}