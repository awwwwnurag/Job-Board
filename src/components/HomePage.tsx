import React, { useState, useEffect, useMemo } from 'react';
import { Job, JobFilters } from '../types/Job';
import { mockJobs } from '../data/mockJobs';
import { getJobsFromStorage } from '../utils/storage';
import JobCard from './JobCard';
import JobFiltersComponent from './JobFilters';
import { ChevronLeft, ChevronRight, Plus, Users, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { companyLogos, defaultLogo } from '../data/companyLogos';
import Footer from './Footer';

const JOBS_PER_PAGE = 6;

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    location: '',
    type: '',
    company: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const storedJobs = getJobsFromStorage();
    const allJobs = [...mockJobs, ...storedJobs];
    setJobs(allJobs);
  }, []);

  useEffect(() => {
    if (location.hash === '#footer') {
      setTimeout(() => {
        const footer = document.getElementById('footer');
        if (footer) {
          footer.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // wait for render
    }
  }, [location]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = !filters.search || 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesLocation = !filters.location || job.location === filters.location;
      const matchesType = !filters.type || job.type === filters.type;
      const matchesCompany = !filters.company || job.company === filters.company;

      return matchesSearch && matchesLocation && matchesType && matchesCompany;
    });
  }, [jobs, filters]);

  const companies = useMemo(() => {
    return Array.from(new Set(jobs.map(job => job.company))).sort();
  }, [jobs]);

  const locations = useMemo(() => {
    return Array.from(new Set(jobs.map(job => job.location))).sort();
  }, [jobs]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

  const top6Jobs = useMemo(() => {
    // Try to get jobs from different companies and types
    const seenCompanies = new Set();
    const seenTypes = new Set();
    const diverseJobs: Job[] = [];
    for (const job of [...jobs].sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())) {
      if (
        (!seenCompanies.has(job.company) || !seenTypes.has(job.type)) &&
        diverseJobs.length < 6
      ) {
        diverseJobs.push(job);
        seenCompanies.add(job.company);
        seenTypes.add(job.type);
      }
      if (diverseJobs.length === 6) break;
    }
    // If not enough, fill with most recent
    if (diverseJobs.length < 6) {
      for (const job of [...jobs].sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())) {
        if (!diverseJobs.includes(job)) {
          diverseJobs.push(job);
        }
        if (diverseJobs.length === 6) break;
      }
    }
    return diverseJobs;
  }, [jobs]);

  const topCompanies = [
    'Paytm',
    'Mahindra',
    'Nykaa',
    'Zomato',
    'OYO Rooms',
    'Fortis Hospitals',
    'Cult.fit',
    'FabIndia',
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary-dark mb-4 tracking-tight">
            <span className="text-black">Discover Your</span> Dream Career
          </h1>
          <p className="text-2xl text-text-light max-w-2xl mx-auto mb-7 font-medium">
            Find roles that match your skills and ambitions. Connect with top employers and take your professional journey to the next level.
          </p>
          <Link to="/jobs" className="inline-block px-10 py-3 bg-primary text-white font-bold rounded-full shadow-card hover:scale-105 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 text-lg focus:outline-none focus:ring-4 focus:ring-primary/30 active:scale-95">
            Browse Jobs
          </Link>
        </div>
        {/* How it Works Section */}
        <div className="max-w-4xl mx-auto mt-16 mb-14">
          <h2 className="text-2xl font-bold text-primary-dark mb-8 text-center">How HireMitra Empowers You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-light text-primary rounded-full p-6 mb-3 flex items-center justify-center">
                <Plus className="h-10 w-10" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-primary-dark">Create Your Profile</h3>
              <p className="text-text-light">Build a standout profile to showcase your skills, experience, and aspirations to top employers.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-light text-primary rounded-full p-6 mb-3 flex items-center justify-center">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-primary-dark">Connect with Companies</h3>
              <p className="text-text-light">Engage directly with hiring managers and recruiters who value your unique talents.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-light text-primary rounded-full p-6 mb-3 flex items-center justify-center">
                <Clock className="h-10 w-10" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-primary-dark">Grow Your Career</h3>
              <p className="text-text-light">Access resources, insights, and opportunities to advance and achieve your professional goals.</p>
            </div>
          </div>
        </div>
        {/* Why Choose HireMitra Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-primary-dark mb-8 text-center">Why Choose HireMitra?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface rounded-2xl shadow-card p-8 flex flex-col items-center text-center border border-background">
              <svg className="h-10 w-10 text-primary mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
              <h3 className="text-lg font-bold text-primary-dark mb-2">Trusted by Professionals</h3>
              <p className="text-text-light">Thousands of job seekers and employers rely on us for genuine, high-quality opportunities.</p>
            </div>
            <div className="bg-surface rounded-2xl shadow-card p-8 flex flex-col items-center text-center border border-background">
              <svg className="h-10 w-10 text-primary mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
              <h3 className="text-lg font-bold text-primary-dark mb-2">Personalized Job Matches</h3>
              <p className="text-text-light">Get recommendations tailored to your skills, interests, and career goals.</p>
            </div>
            <div className="bg-surface rounded-2xl shadow-card p-8 flex flex-col items-center text-center border border-background">
              <svg className="h-10 w-10 text-primary mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 19v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" /></svg>
              <h3 className="text-lg font-bold text-primary-dark mb-2">Fast & Secure Application</h3>
              <p className="text-text-light">Apply to jobs quickly and safely with our streamlined, privacy-focused process.</p>
            </div>
          </div>
        </div>
        {/* Top 6 Jobs Right Now Section */}
        <div className="max-w-5xl mx-auto mb-20 mt-20">
          <div className="bg-surface rounded-2xl shadow-card border border-primary-light px-8 py-10">
            <h2 className="text-3xl font-extrabold text-primary-dark mb-2 text-center tracking-tight">
              <span className="inline-block border-b-4 border-primary pb-1">Top 6 Jobs Right Now</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {top6Jobs.map(job => (
                <div className="transition-transform duration-200 hover:scale-105">
                  <JobCard key={job.id} job={job} hideAvatar={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Top Companies Hiring Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-primary-dark mb-8 text-center">Top Companies Hiring</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-8 items-center justify-center">
            {topCompanies.map(company => (
              <div key={company} className="flex flex-col items-center bg-surface rounded-2xl shadow-card p-7 border border-background hover:shadow-xl transition-all">
                <img
                  src={companyLogos[company] || defaultLogo}
                  alt={company + ' logo'}
                  className="h-16 w-16 object-contain mb-3 rounded-full bg-background border"
                  onError={e => (e.currentTarget.src = defaultLogo)}
                />
                <span className="text-lg font-semibold text-primary-dark text-center">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;