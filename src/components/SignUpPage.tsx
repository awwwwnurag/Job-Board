import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // Add registration logic here
    alert('Account created! (Demo)');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-14 px-4">
      <div className="max-w-md w-full bg-surface p-10 rounded-2xl shadow-card border border-background">
        <h2 className="text-3xl font-extrabold text-center text-primary-dark mb-8">Sign Up for HireMitra</h2>
        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-primary-dark mb-2">Name</label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-3 border border-background rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 bg-gray-100 text-primary-dark placeholder:text-text-light"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
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
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-primary-dark mb-2">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-3 border border-background rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 bg-gray-100 text-primary-dark placeholder:text-text-light"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-card hover:bg-primary-dark transition-all text-lg"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-7 text-center text-text-light text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-accent font-semibold hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage; 