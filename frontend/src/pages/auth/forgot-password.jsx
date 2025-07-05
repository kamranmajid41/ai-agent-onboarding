import React, { useState } from 'react';
import { Card, Button, Input } from '../../components/ui';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would call your backend to send a reset email
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4">
      <Card className="w-full max-w-md glass-dark">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold gradient-text text-shadow mb-2">Forgot Password</h1>
          <p className="text-gray-300">Enter your email to receive a password reset link.</p>
        </div>
        {submitted ? (
          <div className="text-center text-success-400 mb-6">
            If an account with that email exists, a reset link has been sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <Button type="submit" className="w-full btn-primary">Send Reset Link</Button>
          </form>
        )}
        <div className="mt-6 text-center">
          <Link href="/auth/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
} 