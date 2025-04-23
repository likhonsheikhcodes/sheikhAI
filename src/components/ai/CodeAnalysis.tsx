import React, { useState } from 'react';
import { getCodeAnalysis } from '../../services/aiService';
import { AlertCircle, AlertTriangle, Info, UserCircle as LoaderCircle, RefreshCw } from 'lucide-react';
import { AnalysisResponse } from '../../types';

interface CodeAnalysisProps {
  code: string;
  language: string;
}

const CodeAnalysis: React.FC<CodeAnalysisProps> = ({ code, language }) => {
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeCode = async () => {
    if (!code.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getCodeAnalysis({
        code,
        language
      });
      
      setAnalysis(response);
    } catch (err) {
      setError('Failed to analyze code. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getIssueIcon = (type: 'error' | 'warning' | 'info') => {
    switch (type) {
      case 'error':
        return <AlertCircle size={16} className="text-error-500 mr-2 flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-warning-500 mr-2 flex-shrink-0" />;
      case 'info':
        return <Info size={16} className="text-primary-500 mr-2 flex-shrink-0" />;
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Code Analysis (Groq)
        </h3>
        <button
          onClick={handleAnalyzeCode}
          disabled={isLoading || !code.trim()}
          className={`
            px-2 py-1 text-xs font-medium rounded flex items-center
            ${isLoading || !code.trim()
              ? 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }
          `}
        >
          {isLoading ? (
            <>
              <LoaderCircle size={14} className="mr-1 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <RefreshCw size={14} className="mr-1" />
              Analyze
            </>
          )}
        </button>
      </div>
      
      {error && (
        <div className="mb-3 p-2 bg-error-50 dark:bg-error-900/20 text-error-800 dark:text-error-400 text-sm rounded">
          {error}
        </div>
      )}
      
      {analysis && (
        <div className="space-y-3">
          {/* Issues */}
          {analysis.issues.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Issues
              </h4>
              <ul className="space-y-1.5 text-sm">
                {analysis.issues.map((issue, index) => (
                  <li key={index} className="flex items-start">
                    {getIssueIcon(issue.type)}
                    <div>
                      <span className="text-gray-900 dark:text-gray-100">
                        {issue.message}
                      </span>
                      <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">
                        (Line {issue.line}:{issue.column})
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Suggestions */}
          {analysis.suggestions.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Suggestions
              </h4>
              <ul className="space-y-1.5 text-sm">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <Info size={16} className="text-secondary-500 mr-2 flex-shrink-0" />
                    <div>
                      <span className="text-gray-900 dark:text-gray-100">
                        {suggestion.message}
                      </span>
                      <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">
                        (Line {suggestion.line})
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {analysis.issues.length === 0 && analysis.suggestions.length === 0 && (
            <div className="text-sm text-gray-700 dark:text-gray-300">
              No issues found. Your code looks good!
            </div>
          )}
        </div>
      )}
      
      {!analysis && !isLoading && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Click "Analyze" to check your code for potential issues and get suggestions.
        </div>
      )}
    </div>
  );
};

export default CodeAnalysis;