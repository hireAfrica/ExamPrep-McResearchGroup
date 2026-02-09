import type { ExamSubject, Difficulty } from '.';

export interface Exam {
  id: string;
  title: string;
  subject: ExamSubject;
  duration: number;
  questions: number;
  difficulty: Difficulty;
  completed: boolean;
  score?: number;
  date: string;
  description: string;
  topics: string[];
}

export interface ExamResult {
  examId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  completedAt: Date;
}