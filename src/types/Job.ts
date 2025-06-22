export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  description: string;
  requirements: string;
  salary?: string;
  datePosted: string;
  applicationUrl?: string;
  contactEmail?: string;
}

export interface JobFilters {
  search: string;
  location: string;
  type: string;
  company: string;
}