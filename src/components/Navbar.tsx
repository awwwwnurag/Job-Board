import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-header-green px-0 shadow-card border-b-2 border-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-white rounded-full shadow-card border-2 border-primary flex items-center justify-center">
              <Search className="h-7 w-7 text-primary" />
            </div>
            <span className="text-3xl font-black text-white tracking-tight font-sans drop-shadow">HireMitra</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex-1 flex justify-center items-center space-x-6">
            <Link
              to="/about"
              className={`relative flex items-center px-5 py-2 font-bold text-lg rounded-xl transition-all duration-200 transform hover:scale-105
                ${isActive('/about') ? 'bg-white/20 text-white' : 'text-white hover:bg-white/20'}
              `}
            >
              <span>About</span>
            </Link>
            <Link
              to="/#footer"
              className={`relative flex items-center px-5 py-2 font-bold text-lg rounded-xl transition-all duration-200 transform hover:scale-105
                ${isActive('/contact') ? 'bg-white/20 text-white' : 'text-white hover:bg-white/20'}
              `}
            >
              <span>Contact Us</span>
            </Link>
            <Link
              to="/post-job"
              className={`relative flex items-center space-x-2 px-5 py-2 font-bold text-lg rounded-xl transition-all duration-200 transform hover:scale-105
                ${isActive('/post-job') ? 'bg-white/20 text-white' : 'text-white hover:bg-white/20'}
              `}
            >
              <Plus className="h-5 w-5" />
              <span>Post Job</span>
            </Link>
          </div>
          {/* Auth Links */}
          <div className="flex items-center space-x-2">
            <Link
              to="/login"
              className={`relative flex items-center px-5 py-2 font-bold text-lg rounded-xl transition-all duration-200 transform hover:scale-105
                ${isActive('/login') ? 'bg-white/20 text-white' : 'text-white hover:bg-white/20'}
              `}
            >
              <span>Login</span>
            </Link>
            <Link
              to="/signup"
              className="flex items-center px-5 py-2 font-bold text-lg rounded-xl bg-white text-primary shadow-md transition-all duration-200 hover:scale-105"
            >
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;