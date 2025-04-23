import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/common/Header';
import { Code, ArrowRight, Github, Bot, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { status } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-primary-600 dark:text-primary-400">AI-Powered</span> Code Editor
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Write better code faster with AI assistance. Get real-time suggestions, error detection, and code optimization.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => navigate(status === 'authenticated' ? '/editor' : '/login')}
                className="px-6 py-3 text-lg font-medium rounded-lg bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center"
              >
                {status === 'authenticated' ? 'Open Editor' : 'Get Started'}
                <ArrowRight size={20} className="ml-2" />
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-lg font-medium rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center"
              >
                <Github size={20} className="mr-2" />
                View on GitHub
              </a>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Powered by AI
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                  <Code size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Intelligent Code Completion
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get smart code suggestions as you type, powered by Together AI models trained on billions of lines of code.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
                <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg flex items-center justify-center text-secondary-600 dark:text-secondary-400 mb-4">
                  <Bot size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Real-time Code Analysis
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Catch bugs before they happen with Groq-powered real-time code analysis and optimization suggestions.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
                <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center text-accent-600 dark:text-accent-400 mb-4">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Blazing Fast Performance
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Experience unparalleled speed with our optimized editor. Code without lag, even in large projects.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-8 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="text-primary-600 dark:text-primary-400 mr-2">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M13 3L4 14H14L11 21L20 10H10L13 3Z" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Bolt Editor
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Bolt Editor. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;