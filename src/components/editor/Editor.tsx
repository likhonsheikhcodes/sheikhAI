import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { EditorFile, EditorSettings } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface EditorProps {
  file: EditorFile | null;
  onContentChange?: (content: string) => void;
  settings?: Partial<EditorSettings>;
}

const defaultSettings: EditorSettings = {
  theme: 'vs-dark',
  fontSize: 14,
  tabSize: 2,
  wordWrap: 'on',
  minimap: true,
};

const Editor: React.FC<EditorProps> = ({ 
  file, 
  onContentChange,
  settings = {} 
}) => {
  const { theme } = useTheme();
  const [editorSettings, setEditorSettings] = useState<EditorSettings>({
    ...defaultSettings,
    theme: theme === 'dark' ? 'vs-dark' : 'vs-light',
    ...settings
  });

  // Update editor theme when app theme changes
  useEffect(() => {
    setEditorSettings(prev => ({
      ...prev,
      theme: theme === 'dark' ? 'vs-dark' : 'vs-light'
    }));
  }, [theme]);

  // Handle editor value change
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && onContentChange) {
      onContentChange(value);
    }
  };

  // Editor options
  const editorOptions = {
    fontSize: editorSettings.fontSize,
    tabSize: editorSettings.tabSize,
    wordWrap: editorSettings.wordWrap,
    minimap: {
      enabled: editorSettings.minimap,
    },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    smoothScrolling: true,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: 'on',
    fontFamily: '"JetBrains Mono", monospace',
    fontLigatures: true,
  };

  return (
    <div className="w-full h-full overflow-hidden">
      {file ? (
        <MonacoEditor
          height="100%"
          width="100%"
          language={file.language}
          value={file.value}
          theme={editorSettings.theme}
          onChange={handleEditorChange}
          options={editorOptions}
          className="h-full"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              No file selected
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Select a file from the sidebar or create a new one
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;