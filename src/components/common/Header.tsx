import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Sun, Moon, Github, LogOut, Settings as SettingsIcon } from 'lucide-react';
import Settings from './Settings';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, loginWithGithub, logout, status } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center">
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

          {/* Right side - Theme toggle, settings and auth buttons */}
          <div className="flex items-center space-x-4">
            {/* Settings button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Open settings"
            >
              <SettingsIcon size={20} />
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Auth status/buttons */}
            {status === 'authenticated' && user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={() => logout()}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Log out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => loginWithGithub()}
                disabled={status === 'loading'}
                className="flex items-center px-3 py-1.5 text-sm font-medium rounded bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              >
                <Github size={16} className="mr-1.5" />
                {status === 'loading' ? 'Loading...' : 'Sign in with GitHub'}
              </button>
            )}
          </div>
        </div>
      </header>

      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default Header;