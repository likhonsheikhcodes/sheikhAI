import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/layout/Sidebar';
import Editor from '../components/editor/Editor';
import ResizablePanels from '../components/layout/ResizablePanels';
import CodeCompletion from '../components/ai/CodeCompletion';
import CodeAnalysis from '../components/ai/CodeAnalysis';
import { EditorFile } from '../types';
import { sampleFiles } from '../utils/mockData';

const EditorPage: React.FC = () => {
  const [files, setFiles] = useState<EditorFile[]>(sampleFiles);
  const [activeFileId, setActiveFileId] = useState<string | null>(files.length > 0 ? files[0].id : null);
  const [activeFile, setActiveFile] = useState<EditorFile | null>(
    files.length > 0 ? files[0] : null
  );

  // Update active file when activeFileId changes
  useEffect(() => {
    if (activeFileId) {
      const file = files.find(f => f.id === activeFileId) || null;
      setActiveFile(file);
    } else {
      setActiveFile(null);
    }
  }, [activeFileId, files]);

  // Handle file content change
  const handleContentChange = (content: string) => {
    if (activeFileId) {
      setFiles(prevFiles => 
        prevFiles.map(file => 
          file.id === activeFileId 
            ? { ...file, value: content } 
            : file
        )
      );
    }
  };

  // Handle applying AI suggestions
  const handleApplySuggestion = (suggestion: string) => {
    if (activeFileId) {
      setFiles(prevFiles => 
        prevFiles.map(file => 
          file.id === activeFileId 
            ? { ...file, value: file.value + '\n' + suggestion } 
            : file
        )
      );
    }
  };

  // Create a new file
  const handleCreateFile = () => {
    const newId = `file-${Date.now()}`;
    const newFile: EditorFile = {
      id: newId,
      name: `untitled-${files.length + 1}.ts`,
      language: 'typescript',
      value: '// Write your code here\n',
    };
    
    setFiles(prevFiles => [...prevFiles, newFile]);
    setActiveFileId(newId);
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 overflow-hidden">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Main content area with resizable panels */}
        <ResizablePanels
          direction="horizontal"
          sizes={[20, 80]}
          className="flex-1 overflow-hidden"
        >
          {/* Left sidebar */}
          <Sidebar
            files={files}
            activeFileId={activeFileId}
            onFileSelect={setActiveFileId}
            onCreateFile={handleCreateFile}
          />
          
          {/* Main code editor and right panel */}
          <div className="flex flex-col overflow-hidden h-full">
            {/* Code editor */}
            <div className="flex-1 overflow-hidden">
              <Editor
                file={activeFile}
                onContentChange={handleContentChange}
              />
            </div>
            
            {/* Bottom panel with AI tools */}
            <div className="h-64 overflow-y-auto">
              <ResizablePanels
                direction="horizontal"
                sizes={[50, 50]}
                className="h-full"
              >
                {/* Code completion panel */}
                <CodeCompletion
                  language={activeFile?.language || 'typescript'}
                  onApplySuggestion={handleApplySuggestion}
                />
                
                {/* Code analysis panel */}
                <CodeAnalysis
                  code={activeFile?.value || ''}
                  language={activeFile?.language || 'typescript'}
                />
              </ResizablePanels>
            </div>
          </div>
        </ResizablePanels>
      </div>
    </div>
  );
};

export default EditorPage;