import { AppIcon } from '../../types';

const DEFAULT_APP_ICON: AppIcon = {
  emoji: '💰',
  icon192: '',
  icon512: ''
};

export const createAppIconSlice = (set: any) => ({
  appIcon: DEFAULT_APP_ICON,
  setAppIcon: (icon: AppIcon) => {
    set({ appIcon: icon });
    
    // Update document title with emoji
    document.title = `${icon.emoji} Expense Tracker`;
    
    // Update PWA manifest dynamically
    if (icon.icon192 && icon.icon512) {
      const manifestLink = document.querySelector('link[rel="manifest"]');
      if (manifestLink) {
        const currentManifest = {
          name: 'Expense Tracker',
          short_name: 'Expense Tracker',
          description: 'Track your expenses and income easily',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: icon.icon192,
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: icon.icon512,
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: icon.icon512,
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ]
        };

        const manifestBlob = new Blob(
          [JSON.stringify(currentManifest)],
          { type: 'application/json' }
        );
        const manifestUrl = URL.createObjectURL(manifestBlob);
        manifestLink.setAttribute('href', manifestUrl);
      }

      // Update apple touch icon
      let appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
      if (!appleIcon) {
        appleIcon = document.createElement('link');
        appleIcon.setAttribute('rel', 'apple-touch-icon');
        document.head.appendChild(appleIcon);
      }
      appleIcon.setAttribute('href', icon.icon192);

      // Update favicon
      let favicon = document.querySelector('link[rel="icon"]');
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.setAttribute('rel', 'icon');
        favicon.setAttribute('type', 'image/png');
        document.head.appendChild(favicon);
      }
      favicon.setAttribute('href', icon.icon192);
    }
  }
});