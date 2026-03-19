import { defineConfig } from 'vite';

export default defineConfig({
  // Must match the GitHub repository name for GitHub Pages deployment
  base: '/MaterialCarson1/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
  server: {
    open: true,
    port: 3000,
  },
  plugins: [],
});