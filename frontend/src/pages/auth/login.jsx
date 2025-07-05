import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from '../../components/auth/LoginForm';

export default function LoginPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const { login, loading, error } = useAuth();
  const router = useRouter();

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      router.push('/dashboard');
    } catch (error) {
      // Error is handled by the AuthContext
      console.error('Login failed:', error);
    }
  };

  const handleSwitchToRegister = () => {
    router.push('/auth/register');
  };

  return (
    <LoginForm
      onLogin={handleLogin}
      onSwitchToRegister={handleSwitchToRegister}
      loading={loading}
    />
  );
} 