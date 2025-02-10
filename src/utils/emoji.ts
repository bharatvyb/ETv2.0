export const POPULAR_EMOJIS = ['💰', '💸', '🏦', '💳', '💵', '🪙', '📊', '📈', '💹', '🏧'];

export async function generateEmojiIcon(emoji: string) {
  const sizes = [192, 512];
  const icons: Record<string, string> = {};

  for (const size of sizes) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Fill background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);

      // Add gradient background
      const gradient = ctx.createRadialGradient(
        size/2, size/2, 0,
        size/2, size/2, size/2
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.2)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      // Draw emoji
      ctx.font = `${Math.floor(size * 0.6)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, size/2, size/2);

      // Convert to blob URL
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob!);
        }, 'image/png');
      });
      
      icons[`icon${size}`] = URL.createObjectURL(blob);
    }
  }

  return icons;
}