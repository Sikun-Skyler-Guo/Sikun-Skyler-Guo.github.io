import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sikun-skyler-guo.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
