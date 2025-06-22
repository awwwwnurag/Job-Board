import React, { useState, useEffect, useMemo } from 'react';
import { Job, JobFilters } from '../types/Job';
import { mockJobs } from '../data/mockJobs';
import { getJobsFromStorage } from '../utils/storage';
import JobCard from './JobCard';
import JobFiltersComponent from './JobFilters';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const JOBS_PER_PAGE = 6;

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    location: '',
    type: '',
    company: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedJobs = getJobsFromStorage();
    const allJobs = [...mockJobs, ...storedJobs];
    setJobs(allJobs);
  }, []);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <JobFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
          companies={companies}
          locations={locations}
        />
        <div className="flex justify-between items-center mb-6 mt-8">
          <p className="text-text-light">
            Showing {startIndex + 1}-{Math.min(startIndex + JOBS_PER_PAGE, filteredJobs.length)} of {filteredJobs.length} jobs
          </p>
        </div>
        {paginatedJobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-surface rounded-2xl p-10 shadow-card border border-background max-w-md mx-auto">
              <p className="text-accent text-lg mb-2 font-semibold">No jobs found</p>
              <p className="text-text-light">Try adjusting your filters to see more results</p>
            </div>
          </div>
        ) : (
          <>
            <div id="jobs" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center px-4 py-2 text-sm font-medium text-text-light bg-background border border-background rounded-xl hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-accent text-white shadow-card'
                          : 'text-text-light bg-background border border-background hover:bg-surface'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-4 py-2 text-sm font-medium text-text-light bg-background border border-background rounded-xl hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobsPage; 