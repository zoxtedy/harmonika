// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages project site: https://zoxtedy.github.io/harmonika/
// With a custom domain, set `site` to that domain and `base` to '/'.
export default defineConfig({
  site: 'https://zoxtedy.github.io',
  base: '/harmonika',
  trailingSlash: 'always',
});
