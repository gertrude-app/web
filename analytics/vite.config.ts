import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    TanStackRouterVite({ target: 'solid', autoCodeSplitting: true }),
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
