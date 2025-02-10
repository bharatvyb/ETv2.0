import { useStore } from '../store';
import { generateEmojiIcon } from './emoji';
import { POPULAR_EMOJIS } from './emoji';

export async function initializeApp() {
  const store = useStore.getState();
  
  // Only set initial app icon if none exists
  if (!store.appIcon) {
    try {
      const defaultEmoji = POPULAR_EMOJIS[0];
      const icons = await generateEmojiIcon(defaultEmoji);
      store.setAppIcon({ emoji: defaultEmoji, ...icons });
    } catch (error) {
      console.error('Failed to initialize app icon:', error);
    }
  }
}