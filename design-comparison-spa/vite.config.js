import { defineConfig } from 'vite';

export default defineConfig({
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