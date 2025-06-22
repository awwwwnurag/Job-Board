import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    // Add authentication logic here
    alert('Logged in! (Demo)');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-14 px-4">
      <div className="max-w-md w-full bg-surface p-10 rounded-2xl shadow-card border border-background">
        <h2 className="text-3xl font-extrabold text-center text-primary-dark mb-8">Login to HireMitra</h2>
        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-primary-dark mb-2">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full px-4 py-3 border border-background rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 bg-gray-100 text-primary-dark placeholder:text-text-light"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-primary-dark mb-2">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className="w-full px-4 py-3 border border-background rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 pr-12 bg-gray-100 text-primary-dark placeholder:text-text-light"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-light text-sm focus:outline-none"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="text-right mt-2">
              <Link to="#" className="text-accent text-sm hover:underline">Forgot Password?</Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-card hover:bg-primary-dark transition-all text-lg"
          >
            Login
          </button>
        </form>
        <div className="mt-7 text-center text-text-light text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-accent font-semibold hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 