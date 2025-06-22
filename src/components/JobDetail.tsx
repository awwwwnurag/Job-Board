import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Job } from '../types/Job';
import { mockJobs } from '../data/mockJobs';
import { getJobsFromStorage } from '../utils/storage';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Banknote, 
  ExternalLink, 
  Mail,
  Building,
  Clock
} from 'lucide-react';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const storedJobs = getJobsFromStorage();
    const allJobs = [...mockJobs, ...storedJobs];
    const foundJob = allJobs.find(j => j.id === id);
    
    setJob(foundJob || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-accent hover:text-primary-dark mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </button>

        <div className="bg-surface rounded-2xl shadow-card border border-background overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-primary-dark mb-3">
                  {job.title}
                </h1>
                <div className="flex items-center space-x-2 mb-4">
                  <Building className="h-5 w-5 text-text-light" />
                  <span className="text-xl font-medium text-text-light">{job.company}</span>
                </div>
              </div>
              <div className="mt-4 lg:mt-0">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getTypeColor(job.type)}`}> 
                  {job.type}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-background rounded-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-text-light" />
                <div>
                  <p className="text-sm text-text-light">Location</p>
                  <p className="font-medium text-primary-dark">{job.location}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-text-light" />
                <div>
                  <p className="text-sm text-text-light">Posted</p>
                  <p className="font-medium text-primary-dark">{formatDate(job.datePosted)}</p>
                </div>
              </div>

              {job.salary && (
                <div className="flex items-center space-x-3">
                  <Banknote className="h-5 w-5 text-text-light" />
                  <div>
                    <p className="text-sm text-text-light">Salary</p>
                    <p className="font-medium text-accent">{job.salary}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-primary-dark mb-4">Job Description</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-text-light leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary-dark mb-4">Requirements</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-text-light leading-relaxed whitespace-pre-line">
                    {job.requirements}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background px-8 py-6 border-t border-background">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowApplyModal(true)}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors duration-200"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Apply Now
              </button>
              {job.contactEmail && (
                <a
                  href={`mailto:${job.contactEmail}`}
                  className="inline-flex items-center justify-center px-6 py-3 bg-surface text-primary-dark font-medium rounded-xl border border-background hover:bg-background transition-colors duration-200"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Recruiter
                </a>
              )}
            </div>
            
            {job.contactEmail && (
              <p className="text-sm text-text-light mt-3">
                Questions? Reach out to us at {job.contactEmail}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => { setShowApplyModal(false); setShowSuccess(false); }}
              aria-label="Close"
            >
              ×
            </button>
            {showSuccess ? (
              <div className="flex flex-col items-center justify-center py-12">
                <svg className="h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <h2 className="text-2xl font-bold text-green-700 mb-2">Application Submitted!</h2>
                <p className="text-gray-600 mb-4 text-center">Thank you for applying. We have received your application and will get in touch if you are shortlisted.</p>
                <button
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                  onClick={() => { setShowApplyModal(false); setShowSuccess(false); }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Apply for {job.title}</h2>
                <form className="space-y-4" onSubmit={e => { e.preventDefault(); setShowSuccess(true); }}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                    <input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
                    <input type="file" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                    <input type="url" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Why you want this job</label>
                    <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" rows={3} required />
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      type="button"
                      className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                      onClick={() => { setShowApplyModal(false); setShowSuccess(false); }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;