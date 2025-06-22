import { Job } from '../types/Job';

const STORAGE_KEY = 'jobBoard_jobs';

export const getJobsFromStorage = (): Job[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading jobs from storage:', error);
    return [];
  }
};

export const saveJobsToStorage = (jobs: Job[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  } catch (error) {
    console.error('Error saving jobs to storage:', error);
  }
};

export const generateJobId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};