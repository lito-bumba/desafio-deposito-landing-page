import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
        terms: resolve(__dirname, 'terms/index.html'),
        app: resolve(__dirname, 'app/index.html'),
        ios: resolve(__dirname, 'ios/index.html'),
        desafios: resolve(__dirname, 'desafios/index.html'),
        desafio100: resolve(__dirname, 'desafio-100-depositos/index.html'),
        desafio52: resolve(__dirname, 'desafio-52-semanas/index.html'),
      },
    },
  },
});
