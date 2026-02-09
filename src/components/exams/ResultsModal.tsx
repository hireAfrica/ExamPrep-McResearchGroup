import React from 'react';
import { X, CheckCircle, XCircle, Clock, Award } from 'lucide-react';

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: {
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    timeSpent: number;
    topics: Array<{
      name: string;
      correct: number;
      total: number;
    }>;
  };
}

const ResultsModal: React.FC<ResultsModalProps> = ({ isOpen, onClose, results }) => {
  if (!isOpen) return null;

  const percentage = (results.score / 100) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Exam Results</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Score Summary */}
        <div className="p-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
              <span className="text-4xl font-bold text-white">{results.score}%</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {results.score >= 70 ? 'Excellent Work!' : 'Keep Practicing!'}
            </h3>
            <p className="text-gray-600">
              You answered {results.correctAnswers} out of {results.totalQuestions} questions correctly
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{results.correctAnswers}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{results.totalQuestions - results.correctAnswers}</div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{results.timeSpent}m</div>
              <div className="text-sm text-gray-600">Time Spent</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{percentage >= 70 ? 'Pass' : 'Fail'}</div>
              <div className="text-sm text-gray-600">Result</div>
            </div>
          </div>

          {/* Topics Breakdown */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Topics Breakdown</h4>
            <div className="space-y-4">
              {results.topics.map((topic, index) => {
                const topicPercentage = (topic.correct / topic.total) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">{topic.name}</span>
                      <span className="font-bold text-gray-900">
                        {topic.correct}/{topic.total} ({Math.round(topicPercentage)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${topicPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition font-semibold"
            >
              Review Answers
            </button>
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
              Try Another Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;