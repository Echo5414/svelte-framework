import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import purgecss from 'vite-plugin-purgecss';
import customReloadPlugin from './src/custom-reload-plugin.js';
import path from 'path';

const purgecssPlugin = (purgecss.default || purgecss)({
  content: [
    './src/**/*.html',
    './src/**/*.svelte'
  ],
  safelist: [/svelte-/],
  defaultExtractor: (content: string) => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

export default defineConfig({
  plugins: [
    sveltekit(),
    purgecssPlugin,
    customReloadPlugin
  ],
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, 'src/lib'),
      'svelte-framework': path.resolve(__dirname, 'src/lib')
    }
  },
  server: {
    watch: {
      // Watch additional files/paths outside of the standard behavior, if necessary
    }
  }
});
