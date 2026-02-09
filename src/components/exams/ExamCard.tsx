import React from 'react';
import { Calendar, Clock, BookOpen, FileText, CheckCircle, Play } from 'lucide-react';
import { type Exam } from '../../types/exam';
import { formatTime } from '../../utils/format';
import { useLanguage } from '../../contexts/LanguageContext';

interface ExamCardProps {
  exam: Exam;
  onStart: (id: string) => void;
  onViewResults: (id: string) => void;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, onStart, onViewResults }) => {
  const { t } = useLanguage();

  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  const subjectColor = {
    mathematics: 'bg-blue-100 text-blue-800',
    physics: 'bg-purple-100 text-purple-800',
    chemistry: 'bg-green-100 text-green-800',
    biology: 'bg-red-100 text-red-800',
    other: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-2">{exam.title}</h3>
            <div className="flex gap-2">
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${subjectColor[exam.subject]}`}>
                {exam.subject.charAt(0).toUpperCase() + exam.subject.slice(1)}
              </span>
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${difficultyColor[exam.difficulty]}`}>
                {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
              </span>
            </div>
          </div>
          {exam.completed && exam.score && (
            <div className="text-right">
              <div className="text-3xl font-bold">{exam.score}%</div>
              <div className="text-sm opacity-90">{t('score')}</div>
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{formatTime(exam.duration)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{exam.questions} {t('questions')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{exam.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 capitalize">{exam.subject}</span>
          </div>
        </div>

        {/* Topics */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Topics:</p>
          <div className="flex flex-wrap gap-2">
            {exam.topics.slice(0, 3).map((topic, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {topic}
              </span>
            ))}
            {exam.topics.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                +{exam.topics.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        {exam.completed ? (
          <button
            onClick={() => onViewResults(exam.id)}
            className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition font-semibold flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            {t('viewResults')}
          </button>
        ) : (
          <button
            onClick={() => onStart(exam.id)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            {t('startExam')}
          </button>
        )}
      </div>
    </div>
  );
};

export default ExamCard;