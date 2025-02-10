import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card } from '../common';
import { useStore } from '../../store';
import { POPULAR_EMOJIS } from '../../utils/emoji';
import { generateEmojiIcon } from '../../utils/emoji';

export function ResetAppCard() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { 
    clearAllData, 
    resetToDefaultCategories, 
    resetToDefaultPaymentMethods,
    updateUserSettings,
    setAppIcon 
  } = useStore();

  const handleReset = async () => {
    try {
      // Reset app icon to first emoji
      const defaultEmoji = POPULAR_EMOJIS[0];
      const icons = await generateEmojiIcon(defaultEmoji);
      setAppIcon({ emoji: defaultEmoji, ...icons });

      // Reset user settings
      updateUserSettings({
        name: '',
        currency: 'INR'
      });

      // Clear all data and reset defaults
      clearAllData();
      resetToDefaultCategories();
      resetToDefaultPaymentMethods();

      window.location.reload();
    } catch (error) {
      console.error('Failed to reset app:', error);
    }
  };

  return (
    <>
      <Card className="bg-red-50 hover:bg-red-100 cursor-pointer transition-colors">
        <button
          onClick={() => setShowConfirmation(true)}
          className="w-full text-left"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <h3 className="text-lg font-medium text-red-900">Reset App</h3>
              <p className="text-sm text-red-900/70">
                Clear all data and restore default settings
              </p>
            </div>
          </div>
        </button>
      </Card>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h2 className="text-lg font-medium">Reset App</h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                This action will:
              </p>
              <ul className="list-disc ml-6 text-gray-600 space-y-2">
                <li>Delete all your transactions</li>
                <li>Reset categories to defaults</li>
                <li>Reset payment methods to defaults</li>
                <li>Clear your name</li>
                <li>Reset currency to INR</li>
                <li>Reset app icon to default</li>
              </ul>
              <p className="font-medium text-red-600">
                This action cannot be undone!
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                Reset App
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}