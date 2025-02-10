import React, { useState } from 'react';
import { X, User } from 'lucide-react';
import { useStore } from '../../store';
import { generateEmojiIcon } from '../../utils/emoji';

interface AppIconDialogProps {
  onClose: () => void;
}

const POPULAR_EMOJIS = ['💰', '💸', '🏦', '💳', '💵', '🪙', '📊', '📈', '💹', '🏧'];

export function AppIconDialog({ onClose }: AppIconDialogProps) {
  const { appIcon, setAppIcon, userSettings, updateUserSettings } = useStore();
  const [selectedEmoji, setSelectedEmoji] = useState(appIcon?.emoji || '💰');
  const [userName, setUserName] = useState(userSettings.name || '');

  const handleEmojiSelect = async (emoji: string) => {
    setSelectedEmoji(emoji);
    try {
      const icons = await generateEmojiIcon(emoji);
      setAppIcon({ emoji, ...icons });
    } catch (error) {
      console.error('Failed to generate icon:', error);
    }
  };

  const handleSave = () => {
    if (userName.trim()) {
      updateUserSettings({ name: userName.trim() });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 pt-20">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">App Personalization</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* App Icon Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">App Icon</h3>
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-md flex items-center justify-center text-4xl text-white">
                {selectedEmoji}
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {POPULAR_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiSelect(emoji)}
                  className={`text-2xl p-3 rounded-lg transition-all ${
                    selectedEmoji === emoji
                      ? 'bg-blue-100 shadow-inner'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* User Name Section */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <User className="h-4 w-4" />
              Your Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="border-t p-4 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}