import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync, writeFileSync } from 'fs';

// Custom plugin to copy the noam.min.js and fsm_creator.js files to the build directory
const copyExternalScripts = () => {
  return {
    name: 'copy-external-scripts',
    closeBundle() {
      const publicLibDir = resolve(__dirname, 'public/lib');
      const destLibDir = resolve(__dirname, 'dist/lib');
      const scriptsDir = resolve(__dirname, 'public/scripts');
      const destScriptsDir = resolve(__dirname, 'dist/scripts');

      // Create directories if they don't exist
      if (!existsSync(destLibDir)) {
        mkdirSync(destLibDir, { recursive: true });
      }
      
      if (!existsSync(destScriptsDir)) {
        mkdirSync(destScriptsDir, { recursive: true });
      }
      
      // Copy the noam.min.js file
      try {
        copyFileSync(
          resolve(publicLibDir, 'noam.min.js'),
          resolve(destLibDir, 'noam.min.js')
        );
        console.log('✓ Successfully copied noam.min.js');
      } catch (err) {
        console.error('Error copying noam.min.js:', err);
      }
      
      // Copy the fsm_creator.js file
      try {
        copyFileSync(
          resolve(scriptsDir, 'fsm_creator.js'),
          resolve(destScriptsDir, 'fsm_creator.js')
        );
        console.log('✓ Successfully copied fsm_creator.js');
      } catch (err) {
        console.error('Error copying fsm_creator.js:', err);
      }
      
      // Copy the fsm_simulator.js file if it exists
      if (existsSync(resolve(scriptsDir, 'fsm_simulator.js'))) {
        try {
          copyFileSync(
            resolve(scriptsDir, 'fsm_simulator.js'),
            resolve(destScriptsDir, 'fsm_simulator.js')
          );
          console.log('✓ Successfully copied fsm_simulator.js');
        } catch (err) {
          console.error('Error copying fsm_simulator.js:', err);
        }
      }
      
      // Create a _redirects file for Netlify
      try {
        writeFileSync(
          resolve(__dirname, 'dist/_redirects'),
          '/* /index.html 200\n'
        );
        console.log('✓ Created Netlify _redirects file');
      } catch (err) {
        console.error('Error creating _redirects file:', err);
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyExternalScripts()],
  esbuild: {
    target: 'esnext', // Ensures support for top-level await
  },
  build: {
    target: 'esnext', // Ensures final build output supports it
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
