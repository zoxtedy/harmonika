# Harmonika

Website for private piano accordion lessons, in Serbian, Russian and English.
Built with [Astro](https://astro.build) as a static site and deployed to GitHub Pages.

- Serbian: `/` · Russian: `/ru/` · English: `/en/`
- Sections: hero, about the teacher, lessons, pricing, Instagram gallery, contact (WhatsApp, Viber, phone, Instagram)

## Before going live

Replace the placeholders in **`src/config.ts`** (each one is marked `PLACEHOLDER`):

| Field | What to put there |
| --- | --- |
| `teacherName` | Full name (also used for the monogram when there is no photo) |
| `teacherPhoto` | Put a portrait in `public/images/` and set e.g. `'images/teacher.jpg'` (4:5 ratio works best) |
| `city`, `cityIn` | City name, and the "in <city>" form for each language |
| `contact.phone` | Phone number as it should be displayed, e.g. `+381 64 123 4567` |
| `contact.whatsapp` | Same number, digits only: `381641234567` |
| `contact.viber` | Same number with `+`, no spaces: `+381641234567` |
| `contact.instagram` | Instagram username without `@` |
| `stats` | Years of teaching, number of students, student ages |
| `prices` | Price for each plan |
| `instagramPosts` | Links to the posts or reels to show in the gallery |

All other text (bio, lesson levels, plan names, durations) lives in `src/i18n/sr.ts`, `ru.ts` and `en.ts`.
The three files share one type, so a key missing from any language fails `npm run check`.

## Development

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev       # http://localhost:4321/harmonika/
npm test          # type-check, build, and verify the built pages
```

## Deployment

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.
One-time setup: in the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.

The site is served at `https://zoxtedy.github.io/harmonika/`. For a custom domain, change `site` and
set `base: '/'` in `astro.config.mjs`, update `base` in `scripts/verify-build.mjs`, and add the domain in the Pages settings.
