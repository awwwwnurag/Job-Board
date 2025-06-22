import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../types/Job';
import { MapPin, Calendar, Briefcase, Banknote } from 'lucide-react';

interface JobCardProps {
  job: Job;
  hideAvatar?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, hideAvatar = false }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-primary text-white';
      case 'Part-time':
        return 'bg-emerald-200 text-primary-dark';
      case 'Contract':
        return 'bg-yellow-100 text-yellow-800';
      case 'Remote':
        return 'bg-blue-400 text-white';
      default:
        return 'bg-background text-text';
    }
  };

  return (
    <Link to={`/job/${job.id}`} className="block group">
      <div className="bg-surface rounded-2xl p-7 shadow-card border border-background hover:shadow-xl hover:border-accent transition-all duration-300 group-hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              {!hideAvatar && (
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-white shadow-card">
                  {job.company[0]}
                </div>
              )}
              <h3 className="text-2xl font-semibold text-primary-dark group-hover:text-accent transition-colors duration-200">
                {job.title}
              </h3>
            </div>
            <p className="text-lg font-medium text-text-light mb-1">{job.company}</p>
          </div>
          <span className={`px-4 py-1 rounded-full text-sm font-semibold shadow-sm ${getTypeColor(job.type)}`}> 
            {job.type}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-sm text-text-light">
            <span className="inline-flex items-center px-3 py-1 bg-primary-light text-white rounded-full font-medium"><MapPin className="h-4 w-4 mr-1" />{job.location}</span>
            <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-text rounded-full font-medium"><Calendar className="h-4 w-4 mr-1" />Posted {formatDate(job.datePosted)}</span>
          </div>

          {job.salary && (
            <div className="flex items-center space-x-1 text-base text-accent font-semibold">
              <Banknote className="h-5 w-5" />
              <span>{job.salary}</span>
            </div>
          )}

          <p className="text-text-light line-clamp-2 text-base leading-relaxed">
            {job.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-background">
          <span className="inline-flex items-center text-accent text-base font-semibold group-hover:text-primary transition-colors duration-200">
            <Briefcase className="h-5 w-5 mr-2" />
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;