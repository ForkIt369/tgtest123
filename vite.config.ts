import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  root: 'public',
  base: '/tgtest123/', // Ensure this matches your GitHub Pages repository name
  plugins: [react(), basicSsl()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  }
});
