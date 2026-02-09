import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/common/Navbar';
import ExamCard from '../components/exams/ExamCard';
import ExamFilters from '../components/exams/ExamFilters';
import ResultsModal from '../components/exams/ResultsModal';
import type { Exam } from '../types/exam';

const ExamsPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  // Mock exams data
  const exams: Exam[] = [
    {
      id: '1',
      title: 'Mathematics Final Exam 2024',
      subject: 'mathematics',
      duration: 180,
      questions: 50,
      difficulty: 'advanced',
      completed: true,
      score: 85,
      date: '2024-12-15',
      description: 'Comprehensive final exam covering all mathematics topics',
      topics: ['Algebra', 'Calculus', 'Geometry', 'Statistics']
    },
    {
      id: '2',
      title: 'Physics Midterm 2024',
      subject: 'physics',
      duration: 120,
      questions: 40,
      difficulty: 'intermediate',
      completed: false,
      date: '2024-11-20',
      description: 'Midterm exam covering physics fundamentals',
      topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism']
    },
    {
      id: '3',
      title: 'Chemistry Practice Test',
      subject: 'chemistry',
      duration: 90,
      questions: 30,
      difficulty: 'beginner',
      completed: true,
      score: 92,
      date: '2024-12-01',
      description: 'Practice test for chemistry beginners',
      topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry']
    },
    {
      id: '4',
      title: 'Biology Comprehensive Exam',
      subject: 'biology',
      duration: 150,
      questions: 45,
      difficulty: 'advanced',
      completed: false,
      date: '2025-01-10',
      description: 'Comprehensive biology exam',
      topics: ['Genetics', 'Ecology', 'Cell Biology', 'Anatomy']
    },
    {
      id: '5',
      title: 'Calculus Advanced Test',
      subject: 'mathematics',
      duration: 120,
      questions: 35,
      difficulty: 'advanced',
      completed: true,
      score: 78,
      date: '2024-11-25',
      description: 'Advanced calculus test',
      topics: ['Limits', 'Derivatives', 'Integrals', 'Series']
    },
    {
      id: '6',
      title: 'Organic Chemistry Quiz',
      subject: 'chemistry',
      duration: 60,
      questions: 25,
      difficulty: 'intermediate',
      completed: false,
      date: '2024-12-05',
      description: 'Quiz on organic chemistry topics',
      topics: ['Hydrocarbons', 'Functional Groups', 'Reaction Mechanisms']
    }
  ];

  const filteredExams = exams.filter(exam => {
    const matchesSubject = selectedSubject === 'all' || exam.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || exam.difficulty === selectedDifficulty;
    return matchesSubject && matchesDifficulty;
  });

  const completedExams = exams.filter(exam => exam.completed);
  const averageScore = completedExams.length > 0 
    ? Math.round(completedExams.reduce((sum, exam) => sum + (exam.score || 0), 0) / completedExams.length)
    : 0;

  const handleStartExam = (examId: string) => {
    alert(`Start exam ${examId} - This would navigate to exam interface`);
  };

  const handleViewResults = (examId: string) => {
    setSelectedExam(examId);
    setIsResultsModalOpen(true);
  };

  const mockResults = {
    score: 85,
    correctAnswers: 42,
    totalQuestions: 50,
    timeSpent: 145,
    topics: [
      { name: 'Algebra', correct: 9, total: 10 },
      { name: 'Calculus', correct: 8, total: 10 },
      { name: 'Geometry', correct: 10, total: 10 },
      { name: 'Statistics', correct: 7, total: 10 },
      { name: 'Trigonometry', correct: 8, total: 10 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('exams')}</h1>
          <p className="text-gray-600">Practice with realistic exams and track your progress</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Exams</p>
                <p className="text-2xl font-bold text-gray-900">{exams.length}</p>
              </div>
              <div className="text-blue-500">📚</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedExams.length}</p>
              </div>
              <div className="text-green-500">✅</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
              </div>
              <div className="text-purple-500">🏆</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <ExamFilters
          selectedSubject={selectedSubject}
          selectedDifficulty={selectedDifficulty}
          onSubjectChange={setSelectedSubject}
          onDifficultyChange={setSelectedDifficulty}
        />

        {/* Exams Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredExams.length}</span> exams
          </p>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map(exam => (
            <ExamCard
              key={exam.id}
              exam={exam}
              onStart={handleStartExam}
              onViewResults={handleViewResults}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No exams found</h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </div>
        )}

        {/* Progress Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('progressOverview')}</h2>
          <div className="space-y-6">
            {['mathematics', 'physics', 'chemistry', 'biology'].map(subject => {
              const subjectExams = exams.filter(e => e.subject === subject && e.completed);
              const avgScore = subjectExams.length > 0
                ? Math.round(subjectExams.reduce((acc, e) => acc + (e.score || 0), 0) / subjectExams.length)
                : 0;
              
              return (
                <div key={subject} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium capitalize">{subject}</span>
                    <span className="font-bold">{avgScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${avgScore}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {subjectExams.length} exam(s) completed
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Modal */}
      <ResultsModal
        isOpen={isResultsModalOpen}
        onClose={() => setIsResultsModalOpen(false)}
        results={mockResults}
      />
    </div>
  );
};

export default ExamsPage;