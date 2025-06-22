import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full bg-surface rounded-2xl shadow-xl p-10 border border-background">
        <h1 className="text-4xl font-extrabold text-primary mb-4 text-center">About HireMitra</h1>
        <p className="text-lg text-text-light mb-6 text-center">
          HireMitra is your trusted platform for discovering top job opportunities across India. Our mission is to connect talented individuals with leading companies, making the job search process simple, transparent, and effective.
        </p>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary-dark mb-2">Our Vision</h2>
          <p className="text-text-light">
            We believe everyone deserves a fulfilling career. HireMitra is built by a passionate team dedicated to empowering job seekers and employers alike. We strive to provide a seamless experience, whether you're looking for your first job, a career change, or top talent for your organization.
          </p>
        </div>
        <div className="flex justify-center">
          <Link to="/jobs" className="px-8 py-3 bg-primary text-white font-bold rounded-full shadow hover:bg-primary-dark transition-all duration-200 text-lg hover:scale-105 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/30 active:scale-95">
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About; 