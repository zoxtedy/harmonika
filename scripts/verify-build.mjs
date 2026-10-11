// Sanity checks on the built site: every language page exists, is in the right
// language, links stay under the configured base path, and contact links are present.
import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';

const base = '/harmonika/';
const pages = { sr: 'dist/index.html', ru: 'dist/ru/index.html' };

for (const [lang, file] of Object.entries(pages)) {
  assert.ok(existsSync(file), `${file} was not built`);
  const html = readFileSync(file, 'utf8');

  assert.match(html, new RegExp(`<html lang="${lang}"`), `${file}: wrong <html lang>`);
  for (const id of ['about', 'lessons', 'trial', 'gallery', 'contact']) {
    assert.match(html, new RegExp(`id="${id}"`), `${file}: missing #${id} section`);
  }
  for (const link of ['https://wa.me/', 'viber://chat?number=', 'tel:+', 'https://www.instagram.com/']) {
    assert.ok(html.includes(link), `${file}: missing ${link} link`);
  }

  const rootLinks = [...html.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map((m) => m[1]);
  const outside = rootLinks.filter((url) => !url.startsWith(base));
  assert.deepEqual(outside, [], `${file}: links outside ${base}`);
}

assert.ok(existsSync('dist/404.html'), '404 page was not built');
assert.ok(!existsSync('dist/en/index.html'), 'English page should not be built');
console.log('Build verified: sr, ru and 404 pages look correct.');
