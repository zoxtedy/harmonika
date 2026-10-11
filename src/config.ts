/**
 * Site details: names, contacts, prices, Instagram posts.
 * Everything marked PLACEHOLDER must be replaced before going live.
 * Text that differs per language lives in src/i18n/.
 */
import type { Lang } from './i18n';

export const config = {
  /** Brand shown in the header and footer. */
  brand: {
    sr: 'Umetnost Harmonike',
    ru: 'Искусство аккордеона',
    en: 'Accordion Artistry',
  } satisfies Record<Lang, string>,

  /** PLACEHOLDER: teacher's full name. */
  teacherName: 'Ime Prezime',

  /**
   * PLACEHOLDER: path to a portrait inside /public, e.g. 'images/teacher.jpg'.
   * Leave empty to show a monogram instead.
   */
  teacherPhoto: '',

  /** PLACEHOLDER: city, plus the "in <city>" form used inside sentences. */
  city: { sr: 'Beograd', ru: 'Белград', en: 'Belgrade' } satisfies Record<Lang, string>,
  cityIn: { sr: 'u Beogradu', ru: 'в Белграде', en: 'in Belgrade' } satisfies Record<Lang, string>,

  contact: {
    /** PLACEHOLDER: phone number in international format, as it should be displayed. */
    phone: '+381 60 000 0000',
    /** PLACEHOLDER: WhatsApp number, digits only with country code (no +, spaces or leading 00). */
    whatsapp: '381600000000',
    /** PLACEHOLDER: Viber number in international format with +, no spaces. */
    viber: '+381600000000',
    /** PLACEHOLDER: Instagram username without the @. */
    instagram: 'your.instagram',
  },

  /** PLACEHOLDER: numbers shown in the About section. */
  stats: {
    years: '15+',
    students: '200+',
    ages: '6–70',
  },

  /** PLACEHOLDER: prices, keyed like the plans in src/i18n/*.ts. */
  prices: {
    trial: '1.500 RSD',
    single: '2.500 RSD',
    package: '9.000 RSD',
    online: '2.000 RSD',
  },

  /** Instagram posts or reels to embed in the gallery (full URLs). */
  instagramPosts: [
    'https://www.instagram.com/reel/CpsO5QIjjxk/',
    'https://www.instagram.com/reel/DWRRMC8ggfj/',
    'https://www.instagram.com/reel/DWG9JTQglAY/',
  ],
};
