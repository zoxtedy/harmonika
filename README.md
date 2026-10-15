# Harmonika

Website of **Škola harmonike Petar Veličković** — accordion lessons in Kaluđerica, Belgrade. In Serbian and Russian.
Built with [Astro](https://astro.build) as a static site and deployed to GitHub Pages.

- Serbian: `/` · Russian: `/ru/`
- Sections: hero, about the teacher, lessons, free first lesson, Instagram gallery, contact (WhatsApp, Viber, phone, Instagram)

## Before going live

Site details live in **`src/config.ts`**:

| Field | What to put there |
| --- | --- |
| `teacherName` | Full name in each language (its initials show while there is no photo) |
| `teacherPhoto` | Put a portrait in `public/images/` and set e.g. `'images/teacher.jpg'` (4:5 ratio works best) |
| `location` | Where lessons take place |
| `contact.phone` | Phone number as it should be displayed, e.g. `+381 61 2854 390` |
| `contact.whatsapp` | Same number, digits only: `381612854390` |
| `contact.viber` | Same number with `+`, no spaces: `+381612854390` |
| `stats` | Years of teaching, number of students, student ages (hidden while empty) |
| `instagramPosts` | Links to the posts or reels to show in the gallery |

All other text (school name, bio, lessons, first-lesson offer) lives in `src/i18n/sr.ts` and `ru.ts`.
Both files share one type, so a key missing from any language fails `npm run check`.

## Development

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev       # http://localhost:4321/
npm test          # type-check, build, and verify the built pages
```

## Download images from Instagram

To use a photo from an Instagram post on the site (for example as `teacherPhoto`), download it with:

```sh
npm run ig -- https://www.instagram.com/p/SHORTCODE/ -o public/images
```

The script saves the highest-resolution image the post offers. A carousel saves every slide
(`SHORTCODE_1.jpg`, `SHORTCODE_2.jpg`, …), and a reel saves its cover image. You can pass several
links at once. Without `-o`, files go to `instagram-downloads/`, which git ignores.
The post must be public. If Instagram starts refusing requests after many downloads, wait a few minutes.

## Deployment

The site is live at **https://petarvelickovic.com/**, served by Cloudflare, which builds `main`
(`npm run build`, output folder `dist`) on every push.

`.github/workflows/deploy.yml` publishes only a redirect page to GitHub Pages, so the old address
`https://zoxtedy.github.io/harmonika/` forwards visitors to the domain.
