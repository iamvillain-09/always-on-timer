import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.03cb83d896294fd0963774f9a558025c',
  appName: 'Phone Usage Timer',
  webDir: 'dist',
  server: {
    url: 'https://03cb83d8-9629-4fd0-9637-74f9a558025c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;