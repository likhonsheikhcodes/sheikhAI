// Auth types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

// Editor types
export interface EditorFile {
  id: string;
  name: string;
  language: string;
  value: string;
  path?: string;
}

export interface EditorSettings {
  theme: 'vs-dark' | 'vs-light';
  fontSize: number;
  tabSize: number;
  wordWrap: 'on' | 'off';
  minimap: boolean;
}

// AI types
export interface CompletionRequest {
  prompt: string;
  language: string;
  temperature?: number;
  maxTokens?: number;
}

export interface CompletionResponse {
  completion: string;
  language: string;
}

export interface AnalysisRequest {
  code: string;
  language: string;
}

export interface AnalysisResponse {
  issues: Array<{
    type: 'error' | 'warning' | 'info';
    message: string;
    line: number;
    column: number;
  }>;
  suggestions: Array<{
    message: string;
    replacement?: string;
    line: number;
    column: number;
  }>;
}