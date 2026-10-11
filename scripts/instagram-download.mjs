#!/usr/bin/env node
/**
 * Download the image(s) from a public Instagram post.
 *
 * Usage:
 *   node scripts/instagram-download.mjs <post-url> [more-urls...] [-o <dir>]
 *   npm run ig -- <post-url> [-o <dir>]
 *
 * Works with /p/, /reel/ and /tv/ links. Carousel posts download every image;
 * for videos and reels the cover image is saved. Picks the highest resolution
 * Instagram offers to logged-out visitors. Requires Node 18+ (built-in fetch).
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Instagram serves the full post data (instead of a login wall) to crawlers.
const USER_AGENTS = [
  'Googlebot/2.1 (+http://www.google.com/bot.html)',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
];

function parseArgs(argv) {
  const urls = [];
  let outDir = 'instagram-downloads';
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-o' || arg === '--out') {
      outDir = argv[++i];
      if (!outDir) throw new Error(`${arg} needs a directory`);
    } else if (arg === '-h' || arg === '--help') {
      return { help: true };
    } else {
      urls.push(arg);
    }
  }
  return { urls, outDir };
}

function getShortcode(url) {
  const match = url.match(/instagram\.com\/(?:[^/?#]+\/)?(?:p|reels?|tv)\/([A-Za-z0-9_-]+)/);
  if (!match) throw new Error(`Not an Instagram post link: ${url}`);
  return match[1];
}

function decodeHtml(text) {
  return text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
}

// Recursively search parsed JSON for the media object of this post.
function findMedia(node, shortcode) {
  if (!node || typeof node !== 'object') return null;
  if (!Array.isArray(node) && node.code === shortcode && (node.carousel_media || node.image_versions2)) {
    return node;
  }
  for (const value of Object.values(node)) {
    const found = findMedia(value, shortcode);
    if (found) return found;
  }
  return null;
}

function largestCandidate(item) {
  const candidates = item.image_versions2?.candidates ?? [];
  if (!candidates.length) return null;
  return candidates.reduce((best, c) => (c.width * c.height > best.width * best.height ? c : best)).url;
}

function extractImageUrls(html, shortcode) {
  let media = null;
  const scripts = html.matchAll(/<script type="application\/json"[^>]*>([\s\S]*?)<\/script>/g);
  for (const [, body] of scripts) {
    if (!body.includes(shortcode) || !body.includes('image_versions2')) continue;
    try {
      const found = findMedia(JSON.parse(body), shortcode);
      // Prefer a record that includes the carousel, if one exists.
      if (found && (!media || found.carousel_media)) media = found;
    } catch {
      // Not every script block is valid standalone JSON; skip it.
    }
  }

  if (media) {
    const items = media.carousel_media?.length ? media.carousel_media : [media];
    const urls = items.map(largestCandidate).filter(Boolean);
    if (urls.length) return urls;
  }

  // Fallback: the preview image from the page's meta tags (lower resolution).
  const og = html.match(/<meta property="og:image" content="([^"]+)"/);
  return og ? [decodeHtml(og[1])] : [];
}

async function fetchPostHtml(shortcode) {
  for (const userAgent of USER_AGENTS) {
    const res = await fetch(`https://www.instagram.com/p/${shortcode}/`, {
      headers: { 'User-Agent': userAgent, 'Accept-Language': 'en-US,en;q=0.9' },
    });
    if (!res.ok) continue;
    const html = await res.text();
    if (html.includes('image_versions2') || html.includes('og:image')) return html;
  }
  throw new Error('Instagram did not return the post (it may be private, deleted, or rate-limited)');
}

// Use the served type: the CDN often converts (e.g. a .heic path served as JPEG).
function extensionFor(contentType) {
  const subtype = contentType?.match(/image\/([a-z0-9]+)/i)?.[1].toLowerCase();
  if (!subtype || subtype === 'jpeg') return '.jpg';
  return `.${subtype}`;
}

async function downloadPost(url, outDir) {
  const shortcode = getShortcode(url);
  const html = await fetchPostHtml(shortcode);
  const imageUrls = extractImageUrls(html, shortcode);
  if (!imageUrls.length) throw new Error('No images found in the post');

  await mkdir(outDir, { recursive: true });
  const saved = [];
  for (const [i, imageUrl] of imageUrls.entries()) {
    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error(`Image download failed (HTTP ${res.status})`);
    const suffix = imageUrls.length > 1 ? `_${i + 1}` : '';
    const file = path.join(outDir, `${shortcode}${suffix}${extensionFor(res.headers.get('content-type'))}`);
    await writeFile(file, Buffer.from(await res.arrayBuffer()));
    saved.push(file);
  }
  return saved;
}

async function main() {
  const { urls, outDir, help } = parseArgs(process.argv.slice(2));
  if (help || !urls?.length) {
    console.log('Usage: node scripts/instagram-download.mjs <post-url> [more-urls...] [-o <dir>]');
    process.exit(help ? 0 : 1);
  }

  let failed = 0;
  for (const url of urls) {
    try {
      const files = await downloadPost(url, outDir);
      for (const file of files) console.log(`Saved ${file}`);
    } catch (err) {
      failed++;
      console.error(`Failed ${url}: ${err.message}`);
    }
  }
  process.exit(failed ? 1 : 0);
}

main();
