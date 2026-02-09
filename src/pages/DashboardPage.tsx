import React from 'react';
import { BookOpen, CheckCircle, Clock, TrendingUp, Calendar, Award, FileText, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/common/Navbar';
import StatsCard from '../components/dashboard/StatsCard';
import ProgressChart from '../components/dashboard/ProgressChart';
import RecentActivity from '../components/dashboard/RecentActivity';

const DashboardPage: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('totalExams'),
      value: '42',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'blue' as const,
      change: '+12%'
    },
    {
      title: t('completedExams'),
      value: '28',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'green' as const,
      change: '+8%'
    },
    {
      title: t('averageScore'),
      value: '85%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'purple' as const,
      change: '+5%'
    },
    {
      title: t('studyTime'),
      value: '48h',
      icon: <Clock className="w-6 h-6" />,
      color: 'yellow' as const,
      change: '+15%'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'exam',
      title: 'Mathematics Final Exam',
      description: 'Completed with 92% score',
      time: '2 hours ago',
      icon: <Award className="w-5 h-5" />
    },
    {
      id: 2,
      type: 'book',
      title: 'Physics Complete Guide',
      description: 'Downloaded PDF version',
      time: '1 day ago',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 3,
      type: 'quiz',
      title: 'Chemistry Quiz',
      description: 'Completed 25/30 questions',
      time: '2 days ago',
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      id: 4,
      type: 'subscription',
      title: 'Quarterly Subscription',
      description: 'Renewed successfully',
      time: '1 week ago',
      icon: <Calendar className="w-5 h-5" />
    }
  ];

  const upcomingExams = [
    {
      id: 1,
      title: 'Physics Midterm',
      date: 'Tomorrow at 10:00 AM',
      duration: '120 minutes',
      questions: 40,
      subject: 'physics'
    },
    {
      id: 2,
      title: 'Chemistry Quiz',
      date: 'In 3 days',
      duration: '60 minutes',
      questions: 25,
      subject: 'chemistry'
    },
    {
      id: 3,
      title: 'Biology Final',
      date: 'Next week',
      duration: '180 minutes',
      questions: 50,
      subject: 'biology'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('welcomeBack')}, <span className="text-blue-600">John</span>
          </h1>
          <p className="text-gray-600 mt-2">Here's your learning progress overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t('progressOverview')}</h2>
              <ProgressChart />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">{t('recentActivity')}</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  {t('viewAll')}
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <RecentActivity key={activity.id} {...activity} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">{t('upcomingExams')}</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              {t('viewAll')}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingExams.map(exam => (
              <div key={exam.id} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-gray-900">{exam.title}</h3>
                <p className="text-gray-600 text-sm">{exam.date}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {exam.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {exam.questions} questions
                  </span>
                </div>
                <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Start Preparation →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-center">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Browse Books</span>
          </button>
          <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-center">
            <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Take Exam</span>
          </button>
          <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Join Quiz</span>
          </button>
          <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-center">
            <TrendingUp className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">View Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;