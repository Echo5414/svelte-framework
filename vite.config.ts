import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import VitePurgecss from 'vite-plugin-purgecss';
import customReloadPlugin from './src/custom-reload-plugin'; // Adjust the path as necessary

export default defineConfig({
  plugins: [
    sveltekit(),
    VitePurgecss({
      content: [
        './src/**/*.html',
        './src/**/*.svelte'
      ],
      safelist: [/svelte-/],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
    }),
    customReloadPlugin
  ],
  server: {
    watch: {
      // Watch additional files/paths outside of the standard behavior, if necessary
      // ignored: [], // Ignore specific files or paths
    }
  }
});
