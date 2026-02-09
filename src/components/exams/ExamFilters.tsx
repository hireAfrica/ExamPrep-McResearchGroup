import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { EXAM_SUBJECTS, DIFFICULTIES } from '../../utils/constants';

interface ExamFiltersProps {
  selectedSubject: string;
  selectedDifficulty: string;
  onSubjectChange: (subject: string) => void;
  onDifficultyChange: (difficulty: string) => void;
}

const ExamFilters: React.FC<ExamFiltersProps> = ({
  selectedSubject,
  selectedDifficulty,
  onSubjectChange,
  onDifficultyChange
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {/* Subject Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">{t('subject')}:</span>
        <select
          value={selectedSubject}
          onChange={(e) => onSubjectChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
        >
          {EXAM_SUBJECTS.map(subject => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">{t('difficulty')}:</span>
        <select
          value={selectedDifficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
        >
          {DIFFICULTIES.map(difficulty => (
            <option key={difficulty.id} value={difficulty.id}>
              {difficulty.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExamFilters;