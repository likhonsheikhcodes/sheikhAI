import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const [autoApplyChanges, setAutoApplyChanges] = React.useState(true);
  const [autoRestartWorkflows, setAutoRestartWorkflows] = React.useState(true);
  const [selectedModel, setSelectedModel] = React.useState('default');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Assistant Prompt</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <SettingsIcon size={20} />
          </button>
        </div>

        <p className="text-gray-400 mb-6">
          Personalize your Assistant with custom rules & instructions
        </p>

        <div className="space-y-6">
          {/* Default Behavior Section */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-2">Default</h3>
            <p className="text-gray-400">
              Assistant will operate using its default behavior.
            </p>
          </div>

          {/* Advanced Preferences Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">
              Advanced Assistant Preferences
            </h3>

            {/* Model Override */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Model Override
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="default">default</option>
                <option value="claude">Claude 3.7 Sonnet</option>
                <option value="gpt4">GPT-4</option>
              </select>
            </div>

            {/* Auto Apply Changes */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Auto Apply Changes</h4>
                <p className="text-sm text-gray-400">
                  Automatically apply changes made by the AI assistant to your code.
                </p>
              </div>
              <button
                onClick={() => setAutoApplyChanges(!autoApplyChanges)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  autoApplyChanges ? 'bg-primary-600' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoApplyChanges ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Auto Restart Workflows */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Auto Restart Workflows</h4>
                <p className="text-sm text-gray-400">
                  Automatically restart workflows after applying code changes.
                </p>
              </div>
              <button
                onClick={() => setAutoRestartWorkflows(!autoRestartWorkflows)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  autoRestartWorkflows ? 'bg-primary-600' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoRestartWorkflows ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;