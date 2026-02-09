import React, { useState } from 'react';
import { User, Mail, Calendar, BookOpen, Settings, Bell, Shield, CreditCard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/common/Navbar';

const ProfilePage: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');

  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    avatar: null,
    subscription: 'quarterly' as const,
    joinDate: '2024-01-15',
    examsCompleted: 28,
    booksDownloaded: 12,
    averageScore: 85
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'subscription', label: 'Subscription', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {user.firstName[0]}{user.lastName[0]}
                </span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {new Date(user.joinDate).getFullYear()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span>{user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)} Plan</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-md">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.examsCompleted}</div>
                  <div className="text-sm text-gray-600">Exams Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.booksDownloaded}</div>
                  <div className="text-sm text-gray-600">Books Downloaded</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.averageScore}%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="space-y-1 p-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>
                  <div className="space-y-6 max-w-2xl">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue={user.firstName}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue={user.lastName}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                      />
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'subscription' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Subscription Details</h2>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-2xl font-bold">{user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)} Plan</h3>
                        <p className="text-blue-100">Active until December 31, 2024</p>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold">$74.99</div>
                        <div className="text-blue-100">per 3 months</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">Unlimited</div>
                        <div className="text-sm text-blue-100">Exams Access</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">500+</div>
                        <div className="text-sm text-blue-100">Books</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">Priority</div>
                        <div className="text-sm text-blue-100">Support</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">24/7</div>
                        <div className="text-sm text-blue-100">Access</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className="flex-1 bg-white text-blue-600 py-3 rounded-lg hover:bg-gray-100 transition font-semibold">
                        Upgrade Plan
                      </button>
                      <button className="flex-1 border-2 border-white text-white py-3 rounded-lg hover:bg-white/10 transition font-semibold">
                        Cancel Subscription
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
                  <div className="space-y-6 max-w-2xl">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                          />
                        </div>
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                      Update Password
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;