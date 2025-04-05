import { useState } from 'react';
import './Auth.css';  // Regular static import

type AuthType = 'login' | 'register';

interface FormData {
  username: string;
  password: string;
  email?: string;
}

export default function AuthForm({
  type,
  onSubmit,
  error
}: {
  type: AuthType;
  onSubmit: (data: FormData) => Promise<string | void>;
  error?: string;
}) {
  const [formError, setFormError] = useState(error || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData) as FormData;
    const error = await onSubmit(data);
    if (error) setFormError(error);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {type === 'register' && (
        <input name="email" type="email" placeholder="Email" required />
      )}
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      {formError && <div className="error">{formError}</div>}
      <button type="submit">{type === 'login' ? 'Login' : 'Register'}</button>
    </form>
  );
}