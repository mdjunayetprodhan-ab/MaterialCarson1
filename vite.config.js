import { defineConfig } from 'vite';

export default defineConfig({
  root: 'design-comparison-spa',
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