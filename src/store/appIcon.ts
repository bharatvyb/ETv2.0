import { AppIcon } from '../types/store';

export const DEFAULT_APP_ICON: AppIcon = {
  emoji: '💰',
  icon192: '',
  icon512: ''
};

export const createAppIconSlice = (set: any) => ({
  appIcon: DEFAULT_APP_ICON,
  setAppIcon: (icon: AppIcon) => {
    set({ appIcon: icon });
    // Update manifest icons
    if (icon.icon192 && icon.icon512) {
      const manifest = document.querySelector('link[rel="manifest"]');
      if (manifest) {
        const manifestData = {
          icons: [
            {
              src: icon.icon192,
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: icon.icon512,
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: icon.icon512,
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        };
        manifest.setAttribute('href', 
          'data:application/json;charset=utf-8,' + 
          encodeURIComponent(JSON.stringify(manifestData))
        );
      }
    }
  }
});