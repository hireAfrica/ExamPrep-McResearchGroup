import React, { type ReactNode } from 'react';

interface RecentActivityProps {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: ReactNode;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ title, description, time, icon }) => {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
      <div className="text-blue-600 mt-0.5">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
};

export default RecentActivity;