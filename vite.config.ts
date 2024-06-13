import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type PluginOption } from 'vite';
import purgecss from 'vite-plugin-purgecss';
import customReloadPlugin from './src/custom-reload-plugin.js'; // Adjusted path
import path from 'path';

// Define the purgecss plugin as a function
const purgecssPlugin = (purgecss.default || purgecss)({
  content: [
    './src/**/*.html',
    './src/**/*.svelte'
  ],
  safelist: [/svelte-/],
  defaultExtractor: (content: string) => content.match(/[A-Za-z0-9-_:/]+/g) || []
}) as unknown as PluginOption;

export default defineConfig({
  plugins: [
    sveltekit(),
    purgecssPlugin,
    customReloadPlugin as unknown as PluginOption // Explicitly cast customReloadPlugin to PluginOption
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
      // ignored: [], // Ignore specific files or paths
    }
  }
});
