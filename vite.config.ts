import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-plugin-tsconfig-paths';
import WindiCSS from 'vite-plugin-windicss';

// Load environment variables from .env
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [reactRefresh(), tsconfigPaths(), WindiCSS()],
    resolve: {
      alias: [],
    },
    build: {
      target: 'esnext',
    },
    define: {
      // Pass environment variables to the browser
      'process.env': Object.keys(env).reduce((prev, key) => {
        prev[key] = JSON.stringify(env[key]);
        return prev;
      }, {}),
    },
  };
});
