import React from 'react';
import { JobFilters } from '../types/Job';
import { Search, MapPin, Briefcase, Building } from 'lucide-react';

interface JobFiltersProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  companies: string[];
  locations: string[];
}

const JobFiltersComponent: React.FC<JobFiltersProps> = ({
  filters,
  onFiltersChange,
  companies,
  locations
}) => {
  const handleFilterChange = (key: keyof JobFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-surface rounded-2xl p-7 shadow-card border border-background mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="relative">
          <label className="block text-sm font-semibold text-primary-dark mb-2">
            Search Jobs
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
            <input
              type="text"
              placeholder="Job title, keywords..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-background rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 bg-background text-primary-dark placeholder:text-text-light hover:scale-105 hover:-translate-y-0.5 hover:shadow-card"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-primary-dark mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-background rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 appearance-none bg-background text-primary-dark hover:scale-105 hover:-translate-y-0.5 hover:shadow-card"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-primary-dark mb-2">
            Job Type
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-background rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 appearance-none bg-background text-primary-dark hover:scale-105 hover:-translate-y-0.5 hover:shadow-card"
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-primary-dark mb-2">
            Company
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
            <select
              value={filters.company}
              onChange={(e) => handleFilterChange('company', e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-background rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 appearance-none bg-background text-primary-dark hover:scale-105 hover:-translate-y-0.5 hover:shadow-card"
            >
              <option value="">All Companies</option>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFiltersComponent;