import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import RegisterForm from '../../components/auth/RegisterForm';

export default function RegisterPage() {
  const { register, loading, error } = useAuth();
  const router = useRouter();

  const handleRegister = async (userData) => {
    try {
      await register(userData);
      router.push('/dashboard');
    } catch (error) {
      // Error is handled by the AuthContext
      console.error('Registration failed:', error);
    }
  };

  const handleSwitchToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <RegisterForm
      onRegister={handleRegister}
      onSwitchToLogin={handleSwitchToLogin}
      loading={loading}
    />
  );
} 