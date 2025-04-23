import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/common/Header';
import { Eye, EyeOff, Github, Mail, Lock, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginWithGithub, register } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!name.trim()) {
          throw new Error('Name is required');
        }
        await register(name, email, password);
      }
      navigate('/editor');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      setError(null);
      await loginWithGithub();
      navigate('/editor');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'GitHub authentication failed';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                {isLogin ? 'Sign in to your account' : 'Create a new account'}
              </h2>
              
              {/* Github login button */}
              <button
                type="button"
                onClick={handleGithubLogin}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 mb-6"
              >
                <Github size={18} className="mr-2" />
                {isLogin ? 'Sign in' : 'Sign up'} with GitHub
              </button>
              
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with email
                  </span>
                </div>
              </div>
              
              {/* Error message */}
              {error && (
                <div className="mb-4 p-3 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-md flex items-start">
                  <AlertCircle size={18} className="text-error-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-error-800 dark:text-error-400">{error}</span>
                </div>
              )}
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name field (only for register) */}
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required={!isLogin}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
                
                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={16} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                {/* Password field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={16} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete={isLogin ? 'current-password' : 'new-password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff size={16} aria-hidden="true" />
                        ) : (
                          <Eye size={16} aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full px-4 py-2 text-sm font-medium rounded-md text-white bg-primary-600 ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-700'
                    }`}
                  >
                    {isLoading
                      ? 'Processing...'
                      : isLogin
                        ? 'Sign in'
                        : 'Create account'
                    }
                  </button>
                </div>
              </form>
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg border-t border-gray-200 dark:border-gray-600">
              <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError(null);
                  }}
                  className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;