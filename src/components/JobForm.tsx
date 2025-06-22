import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Job } from '../types/Job';
import { getJobsFromStorage, saveJobsToStorage, generateJobId } from '../utils/storage';
import { Check, ArrowLeft } from 'lucide-react';

const JobForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time' as Job['type'],
    description: '',
    requirements: '',
    salary: '',
    applicationUrl: '',
    contactEmail: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    }

    if (!formData.requirements.trim()) {
      newErrors.requirements = 'Requirements are required';
    }

    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const existingJobs = getJobsFromStorage();
      const newJob: Job = {
        id: generateJobId(),
        ...formData,
        datePosted: new Date().toISOString().split('T')[0]
      };

      const updatedJobs = [newJob, ...existingJobs];
      saveJobsToStorage(updatedJobs);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      navigate('/', { 
        state: { 
          message: 'Job posted successfully!',
          jobId: newJob.id
        }
      });
    } catch (error) {
      console.error('Error posting job:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-accent hover:text-primary-dark mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        <div className="bg-surface rounded-2xl shadow-card border border-background p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-primary-dark mb-2">Post a New Job</h1>
            <p className="text-text-light">Fill in the details below to post your job listing</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-primary-dark mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 bg-background text-primary-dark placeholder:text-text-light ${
                    errors.title ? 'border-red-300' : 'border-background'
                  }`}
                  placeholder="e.g. Senior Frontend Developer"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-primary-dark mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 bg-background text-primary-dark placeholder:text-text-light ${
                    errors.company ? 'border-red-300' : 'border-background'
                  }`}
                  placeholder="e.g. TechCorp Inc"
                />
                {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-primary-dark mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 bg-background text-primary-dark placeholder:text-text-light ${
                    errors.location ? 'border-red-300' : 'border-background'
                  }`}
                  placeholder="e.g. San Francisco, CA"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-semibold text-primary-dark mb-2">
                  Job Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-background rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 appearance-none bg-background text-primary-dark"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="salary" className="block text-sm font-semibold text-primary-dark mb-2">
                Salary Range (Optional)
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-background rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 bg-background text-primary-dark placeholder:text-text-light"
                placeholder="e.g. ₹8,00,000 - ₹12,00,000"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div>
                <label htmlFor="applicationUrl" className="block text-sm font-semibold text-primary-dark mb-2">
                  Application URL (Optional)
                </label>
                <input
                  type="text"
                  id="applicationUrl"
                  name="applicationUrl"
                  value={formData.applicationUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-background rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 bg-background text-primary-dark placeholder:text-text-light"
                  placeholder="e.g. https://company.com/careers"
                />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-semibold text-primary-dark mb-2">
                  Contact Email (Optional)
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 bg-background text-primary-dark placeholder:text-text-light ${
                    errors.contactEmail ? 'border-red-300' : 'border-background'
                  }`}
                  placeholder="e.g. hr@company.com"
                />
                {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-primary-dark mb-2">
                Job Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 bg-background text-primary-dark placeholder:text-text-light min-h-[100px] ${
                  errors.description ? 'border-red-300' : 'border-background'
                }`}
                placeholder="Describe the job role, responsibilities, etc."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label htmlFor="requirements" className="block text-sm font-semibold text-primary-dark mb-2">
                Requirements *
              </label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 bg-background text-primary-dark placeholder:text-text-light min-h-[80px] ${
                  errors.requirements ? 'border-red-300' : 'border-background'
                }`}
                placeholder="List the requirements, skills, etc."
              />
              {errors.requirements && <p className="text-red-500 text-sm mt-1">{errors.requirements}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-card hover:bg-primary-dark transition-all text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post Job'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobForm;