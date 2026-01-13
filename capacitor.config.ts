interface CapacitorConfig {
  appId: string;
  appName: string;
  webDir: string;
  server?: {
    url?: string;
    cleartext?: boolean;
    allowNavigation?: string[];
  };
  plugins?: {
    [key: string]: any;
  };
}

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'tareas-app',
  webDir: 'www'
};

export default config;