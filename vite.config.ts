import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    target: 'esnext', // Ensures support for top-level await
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
