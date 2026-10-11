# Harmonika

Website for private piano accordion lessons, in Serbian and Russian.
Built with [Astro](https://astro.build) as a static site and deployed to GitHub Pages.

- Serbian: `/` · Russian: `/ru/`
- Sections: hero, about the teacher, lessons, free first lesson, Instagram gallery, contact (WhatsApp, Viber, phone, Instagram)

## Before going live

Fill in **`src/config.ts`** (remaining placeholders are marked `PLACEHOLDER`):

| Field | What to put there |
| --- | --- |
| `teacherName` | Full name in each language (its initials show while there is no photo) |
| `teacherPhoto` | Put a portrait in `public/images/` and set e.g. `'images/teacher.jpg'` (4:5 ratio works best) |
| `contact.phone` | Phone number as it should be displayed, e.g. `+381 64 123 4567` |
| `contact.whatsapp` | Same number, digits only: `381641234567` |
| `contact.viber` | Same number with `+`, no spaces: `+381641234567` |
| `stats` | Years of teaching, number of students, student ages (hidden while empty) |
| `instagramPosts` | Links to the posts or reels to show in the gallery |

All other text (bio, lesson levels, first-lesson offer) lives in `src/i18n/sr.ts` and `ru.ts`.
Both files share one type, so a key missing from any language fails `npm run check`.

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
