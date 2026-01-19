
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Crucial for GitHub Pages to find assets in subfolders
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
