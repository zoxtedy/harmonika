// @ts-check
import { defineConfig } from 'astro/config';

// Served from the root of https://petarvelickovic.com/.
export default defineConfig({
  site: 'https://petarvelickovic.com',
  trailingSlash: 'always',
});
