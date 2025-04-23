import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SettingsContextType {
  autoApplyChanges: boolean;
  setAutoApplyChanges: (value: boolean) => void;
  autoRestartWorkflows: boolean;
  setAutoRestartWorkflows: (value: boolean) => void;
  selectedModel: string;
  setSelectedModel: (value: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [autoApplyChanges, setAutoApplyChanges] = useState(true);
  const [autoRestartWorkflows, setAutoRestartWorkflows] = useState(true);
  const [selectedModel, setSelectedModel] = useState('default');

  return (
    <SettingsContext.Provider
      value={{
        autoApplyChanges,
        setAutoApplyChanges,
        autoRestartWorkflows,
        setAutoRestartWorkflows,
        selectedModel,
        setSelectedModel,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};