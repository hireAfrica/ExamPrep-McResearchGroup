export const APP_NAME = 'ExamPrep Pro';
export const APP_DESCRIPTION = 'Complete exam preparation platform';

export const LANGUAGES = {
  fr: 'Français',
  en: 'English'
} as const;

export const SUBSCRIPTION_PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 29.99,
    period: 'month',
    features: [
      'Access to all exams',
      'Unlimited interactive quizzes',
      'Detailed corrections',
      'Course summaries',
      'Email support'
    ],
    popular: false
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    price: 74.99,
    period: '3 months',
    features: [
      'All monthly benefits',
      'Access to book library',
      '17% savings',
      'Priority support',
      'Exclusive updates'
    ],
    popular: true
  }
] as const;

export const BOOK_CATEGORIES = [
  { id: 'all', name: 'All Categories' },
  { id: 'mathematics', name: 'Mathematics' },
  { id: 'physics', name: 'Physics' },
  { id: 'chemistry', name: 'Chemistry' },
  { id: 'biology', name: 'Biology' },
  { id: 'history', name: 'History' },
  { id: 'literature', name: 'Literature' }
] as const;

export const EXAM_SUBJECTS = [
  { id: 'all', name: 'All Subjects' },
  { id: 'mathematics', name: 'Mathematics' },
  { id: 'physics', name: 'Physics' },
  { id: 'chemistry', name: 'Chemistry' },
  { id: 'biology', name: 'Biology' }
] as const;

export const DIFFICULTIES = [
  { id: 'all', name: 'All Levels' },
  { id: 'beginner', name: 'Beginner' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'advanced', name: 'Advanced' }
] as const;