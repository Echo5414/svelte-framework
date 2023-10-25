import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import VitePurgecss from 'vite-plugin-purgecss';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
  vite: {
    plugins: [
      VitePurgecss({
        content: [
          './src/**/*.html',
          './src/**/*.svelte'
        ],
        safelist: [/svelte-/],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
      })
    ]
  }
};

export default config;
