import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const SubscriptionBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Get Unlimited Access to All Books</h2>
        <p className="text-blue-100 mb-6">
          Subscribe to our quarterly plan and get access to our entire book library, 
          plus all exam materials and premium features
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-semibold">
            View Subscription Plans
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition font-semibold">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBanner;