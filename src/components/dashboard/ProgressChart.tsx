import React from 'react';

const ProgressChart: React.FC = () => {
  const progressData = [
    { subject: 'Mathematics', percentage: 85 },
    { subject: 'Physics', percentage: 72 },
    { subject: 'Chemistry', percentage: 90 },
    { subject: 'Biology', percentage: 68 }
  ];

  return (
    <div className="space-y-6">
      {progressData.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">{item.subject}</span>
            <span className="font-bold text-gray-900">{item.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${item.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressChart;