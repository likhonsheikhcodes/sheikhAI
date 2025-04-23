import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HomePage from '../pages/Home';
import EditorPage from '../pages/Editor';
import LoginPage from '../pages/Login';
import LoadingPage from '../pages/Loading';

const AppRoutes: React.FC = () => {
  const { status } = useAuth();

  // Show loading page while checking authentication
  if (status === 'loading') {
    return <LoadingPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/editor" 
        element={
          status === 'authenticated' 
            ? <EditorPage /> 
            : <Navigate to="/login" replace />
        } 
      />
      <Route 
        path="/login" 
        element={
          status === 'unauthenticated' 
            ? <LoginPage /> 
            : <Navigate to="/editor" replace />
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;