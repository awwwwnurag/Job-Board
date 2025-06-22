import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import JobDetail from './components/JobDetail';
import JobForm from './components/JobForm';
import JobsPage from './components/JobsPage';
import About from './components/About';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/post-job" element={<JobForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;