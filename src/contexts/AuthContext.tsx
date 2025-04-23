import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthStatus } from '../types';
import { supabase } from '../services/supabase';

interface AuthContextType {
  user: User | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<void>;
  loginWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.full_name || 'User',
          email: session.user.email!,
          avatar: session.user.user_metadata.avatar_url
        });
        setStatus('authenticated');
      } else {
        setStatus('unauthenticated');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.full_name || 'User',
          email: session.user.email!,
          avatar: session.user.user_metadata.avatar_url
        });
        setStatus('authenticated');
      } else {
        setUser(null);
        setStatus('unauthenticated');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setStatus('loading');
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Login failed:', error);
      setStatus('unauthenticated');
      throw error;
    }
  };

  const loginWithGithub = async () => {
    try {
      setStatus('loading');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github'
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('GitHub login failed:', error);
      setStatus('unauthenticated');
      throw error;
    }
  };

  const logout = async () => {
    try {
      setStatus('loading');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setStatus('loading');
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Registration failed:', error);
      setStatus('unauthenticated');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      status, 
      login, 
      loginWithGithub, 
      logout, 
      register 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};