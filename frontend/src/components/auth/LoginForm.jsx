import React, { useState } from 'react';
import { Input, Button, Card, Toast } from '../ui';
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useRouter } from 'next/router';

const LoginForm = ({ onLogin, onSwitchToRegister, loading = false }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('error');
  const [loginError, setLoginError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!validateForm()) {
      setToastMessage('Please fix the errors above');
      setToastType('error');
      setShowToast(true);
      return;
    }
    try {
      await onLogin(formData);
    } catch (error) {
      setToastMessage(error.message || 'Login failed. Please try again.');
      setToastType('error');
      setShowToast(true);
      setLoginError(error.message || 'Incorrect email or password.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
      
      <Card className="w-full max-w-md glass">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text text-shadow mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your AI Agent Platform account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={AiOutlineMail}
            placeholder="Enter your email"
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={AiOutlineLock}
              placeholder="Enter your password"
              required
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-7 inset-y-0 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
              tabIndex={-1}
              style={{ padding: 0 }}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>
          {loginError && (
            <div className="text-error-400 text-xs mt-2 ml-1">{loginError}</div>
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-surface-300 text-primary-600 focus:ring-primary-400 bg-surface-50" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm text-primary-600 hover:text-primary-500 transition-colors"
              onClick={() => router.push('/auth/forgot-password')}
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            className="w-full btn-primary"
            loading={loading}
            disabled={loading}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-primary-600 hover:text-primary-500 font-medium transition-colors"
            >
              Sign up here
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm; 