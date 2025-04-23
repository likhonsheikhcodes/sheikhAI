import React, { useState } from 'react';
import { EditorFile } from '../../types';
import { File, FolderTree, Settings, Terminal, Github as GitHub, Code, Plus } from 'lucide-react';

interface SidebarProps {
  files: EditorFile[];
  activeFileId: string | null;
  onFileSelect: (fileId: string) => void;
  onCreateFile?: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  files,
  activeFileId,
  onFileSelect,
  onCreateFile,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'files' | 'settings'>('files');

  return (
    <div className={`flex flex-col h-full bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 ${className}`}>
      {/* Sidebar tabs */}
      <div className="flex bg-gray-200 dark:bg-gray-800">
        <button
          onClick={() => setActiveTab('files')}
          className={`flex items-center justify-center w-12 h-12 transition-colors ${
            activeTab === 'files'
              ? 'bg-white dark:bg-gray-900 text-primary-600 dark:text-primary-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          aria-label="Files"
        >
          <FolderTree size={20} />
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center justify-center w-12 h-12 transition-colors ${
            activeTab === 'settings'
              ? 'bg-white dark:bg-gray-900 text-primary-600 dark:text-primary-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          aria-label="Settings"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'files' && (
          <div className="p-2">
            <div className="flex justify-between items-center mb-2 px-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Project Files
              </h3>
              {onCreateFile && (
                <button 
                  onClick={onCreateFile}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                  aria-label="Create new file"
                >
                  <Plus size={16} />
                </button>
              )}
            </div>
            <ul>
              {files.map((file) => (
                <li 
                  key={file.id}
                  className={`
                    flex items-center px-2 py-1.5 rounded text-sm cursor-pointer
                    ${file.id === activeFileId 
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }
                  `}
                  onClick={() => onFileSelect(file.id)}
                >
                  <File size={16} className="mr-2 flex-shrink-0" />
                  <span className="truncate">{file.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Settings
            </h3>
            {/* Settings placeholder - in a full app, these would be real settings */}
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <Code size={16} className="mr-2 text-gray-500" />
                <span>Editor Preferences</span>
              </li>
              <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <Terminal size={16} className="mr-2 text-gray-500" />
                <span>Terminal Settings</span>
              </li>
              <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <GitHub size={16} className="mr-2 text-gray-500" />
                <span>GitHub Integration</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;