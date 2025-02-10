import React, { useState } from 'react';
import { Card } from '../common';
import { useStore } from '../../store';
import { generateEmojiIcon } from '../../utils/emoji';
import { Smile } from 'lucide-react';

const POPULAR_EMOJIS = ['💰', '💸', '🏦', '💳', '💵', '🪙', '📊', '📈', '💹', '🏧'];

export function EmojiPicker() {
  const [showPicker, setShowPicker] = useState(false);
  const { appIcon, setAppIcon } = useStore();

  const handleEmojiSelect = async (emoji: string) => {
    try {
      const icons = await generateEmojiIcon(emoji);
      setAppIcon({ emoji, ...icons });
      setShowPicker(false);
    } catch (error) {
      console.error('Failed to generate icon:', error);
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <Smile className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-medium">App Icon</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center text-3xl border">
            {appIcon?.emoji || '💰'}
          </div>
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {showPicker ? 'Close' : 'Change Icon'}
          </button>
        </div>

        {showPicker && (
          <div className="grid grid-cols-5 gap-2">
            {POPULAR_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmojiSelect(emoji)}
                className="text-2xl p-3 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}