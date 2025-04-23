import axios from 'axios';
import { CompletionRequest, CompletionResponse, AnalysisRequest, AnalysisResponse } from '../types';

const TOGETHER_API_KEY = import.meta.env.VITE_TOGETHER_API_KEY;
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const togetherApi = axios.create({
  baseURL: 'https://api.together.xyz/v1',
  headers: {
    'Authorization': `Bearer ${TOGETHER_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

const groqApi = axios.create({
  baseURL: 'https://api.groq.com/v1',
  headers: {
    'Authorization': `Bearer ${GROQ_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const getCodeCompletion = async (request: CompletionRequest): Promise<CompletionResponse> => {
  try {
    const response = await togetherApi.post('/completions', {
      model: 'codellama/CodeLlama-34b-Instruct-hf',
      prompt: request.prompt,
      max_tokens: request.maxTokens || 150,
      temperature: request.temperature || 0.7,
      stop: ['```'],
    });

    return {
      completion: response.data.choices[0].text.trim(),
      language: request.language
    };
  } catch (error) {
    console.error('Code completion failed:', error);
    throw new Error('Failed to get code completion');
  }
};

export const getCodeAnalysis = async (request: AnalysisRequest): Promise<AnalysisResponse> => {
  try {
    const response = await groqApi.post('/chat/completions', {
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: 'You are a code analysis expert. Analyze the code for potential issues and provide suggestions for improvement.'
        },
        {
          role: 'user',
          content: `Analyze this ${request.language} code:\n\n${request.code}`
        }
      ],
      temperature: 0.3,
    });

    // Parse the AI response to extract issues and suggestions
    const analysis = parseAIResponse(response.data.choices[0].message.content);
    return analysis;
  } catch (error) {
    console.error('Code analysis failed:', error);
    throw new Error('Failed to get code analysis');
  }
};

function parseAIResponse(content: string): AnalysisResponse {
  // This is a simplified parser - in production you'd want more robust parsing
  const issues: AnalysisResponse['issues'] = [];
  const suggestions: AnalysisResponse['suggestions'] = [];

  const lines = content.split('\n');
  let currentSection: 'issues' | 'suggestions' | null = null;

  for (const line of lines) {
    if (line.toLowerCase().includes('issue:')) {
      currentSection = 'issues';
      const match = line.match(/line (\d+)(?::(\d+))?/i);
      if (match) {
        issues.push({
          type: line.toLowerCase().includes('error') ? 'error' : 
                line.toLowerCase().includes('warning') ? 'warning' : 'info',
          message: line.split(':').slice(-1)[0].trim(),
          line: parseInt(match[1]),
          column: match[2] ? parseInt(match[2]) : 1
        });
      }
    } else if (line.toLowerCase().includes('suggestion:')) {
      currentSection = 'suggestions';
      const match = line.match(/line (\d+)/i);
      if (match) {
        suggestions.push({
          message: line.split(':').slice(-1)[0].trim(),
          line: parseInt(match[1]),
          column: 1
        });
      }
    }
  }

  return { issues, suggestions };
}