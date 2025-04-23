import { EditorFile, AnalysisResponse } from '../types';

export const sampleFiles: EditorFile[] = [
  {
    id: '1',
    name: 'main.tsx',
    language: 'typescript',
    value: `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
    path: 'src/main.tsx'
  },
  {
    id: '2',
    name: 'App.tsx',
    language: 'typescript',
    value: `import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;`,
    path: 'src/App.tsx'
  },
  {
    id: '3',
    name: 'index.css',
    language: 'css',
    value: `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100;
  font-family: 'Inter', sans-serif;
}

code {
  font-family: 'JetBrains Mono', monospace;
}`,
    path: 'src/index.css'
  }
];

export const mockAnalysis: AnalysisResponse = {
  issues: [
    {
      type: 'warning',
      message: 'Unused variable',
      line: 1,
      column: 10
    },
    {
      type: 'error',
      message: 'Missing semicolon',
      line: 5,
      column: 22
    }
  ],
  suggestions: [
    {
      message: 'Consider using a more descriptive variable name',
      line: 3,
      column: 5
    },
    {
      message: 'This function could be simplified',
      replacement: 'return items.filter(item => item.active)',
      line: 7,
      column: 3
    }
  ]
};