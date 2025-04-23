import React from 'react';
import { UserCircle as LoaderCircle } from 'lucide-react';

const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center">
        <LoaderCircle size={40} className="text-primary-600 dark:text-primary-400 animate-spin mb-4" />
        <h2 className="text-xl font-medium text-gray-900 dark:text-white">
          Loading...
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Please wait while we load your data
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;