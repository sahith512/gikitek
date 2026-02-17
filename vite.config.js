import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        products: resolve(__dirname, 'products.html'),
        solutions: resolve(__dirname, 'solutions.html'),
        industries: resolve(__dirname, 'industries.html'),
        company: resolve(__dirname, 'company.html'),
        resources: resolve(__dirname, 'resources.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
