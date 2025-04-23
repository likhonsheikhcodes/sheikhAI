import React, { useState } from 'react';
import { getCodeCompletion } from '../../services/aiService';
import { Sparkles, UserCircle as LoaderCircle } from 'lucide-react';

interface CodeCompletionProps {
  language: string;
  onApplySuggestion: (suggestion: string) => void;
}

const CodeCompletion: React.FC<CodeCompletionProps> = ({ 
  language, 
  onApplySuggestion 
}) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetCompletion = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getCodeCompletion({
        prompt,
        language,
        temperature: 0.7,
        maxTokens: 150
      });
      
      setSuggestion(response.completion);
    } catch (err) {
      setError('Failed to get code suggestion. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplySuggestion = () => {
    if (suggestion) {
      onApplySuggestion(suggestion);
      setSuggestion(null);
      setPrompt('');
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="mb-3 flex items-center">
        <Sparkles size={16} className="text-secondary-500 mr-2" />
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          AI Code Assistant
        </h3>
      </div>
      
      <div className="mb-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what code you want to generate..."
          className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          rows={2}
        />
      </div>
      
      {error && (
        <div className="mb-3 p-2 bg-error-50 dark:bg-error-900/20 text-error-800 dark:text-error-400 text-sm rounded">
          {error}
        </div>
      )}
      
      {suggestion && (
        <div className="mb-3">
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-sm font-mono whitespace-pre-wrap text-gray-900 dark:text-gray-100 overflow-auto max-h-40">
            {suggestion}
          </div>
          <button
            onClick={handleApplySuggestion}
            className="mt-2 px-3 py-1 text-xs font-medium bg-primary-600 hover:bg-primary-700 text-white rounded transition-colors"
          >
            Apply Suggestion
          </button>
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          onClick={handleGetCompletion}
          disabled={isLoading || !prompt.trim()}
          className={`
            px-3 py-1.5 text-sm font-medium rounded-md flex items-center
            ${isLoading || !prompt.trim()
              ? 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
            }
          `}
        >
          {isLoading ? (
            <>
              <LoaderCircle size={16} className="mr-1.5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={16} className="mr-1.5" />
              Generate Code
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeCompletion;