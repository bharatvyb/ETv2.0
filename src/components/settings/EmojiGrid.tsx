import React from 'react';
import { useStore } from '../../store';
import { generateEmojiIcon } from '../../utils/emoji';

const POPULAR_EMOJIS = ['💰', '💸', '🏦', '💳', '💵', '🪙', '📊', '📈', '💹', '🏧'];

interface EmojiGridProps {
  onClose: () => void;
}

export function EmojiGrid({ onClose }: EmojiGridProps) {
  const { setAppIcon } = useStore();

  const handleEmojiSelect = async (emoji: string) => {
    try {
      const icons = await generateEmojiIcon(emoji);
      setAppIcon({ emoji, ...icons });
      onClose();
    } catch (error) {
      console.error('Failed to generate icon:', error);
    }
  };

  return (
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
  );
}