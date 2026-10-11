/**
 * Site details: names, contacts, stats, Instagram posts.
 * Everything marked PLACEHOLDER must be replaced before going live.
 * Text that differs per language lives in src/i18n/.
 */
import type { Lang } from './i18n';

export const config = {
  /** Brand shown in the header and footer. */
  brand: {
    sr: 'Umetnost Harmonike',
    ru: 'Искусство аккордеона',
  } satisfies Record<Lang, string>,

  /** Teacher's name as written in each language (initials are taken from it). */
  teacherName: {
    sr: 'Petar Veličković',
    ru: 'Петар Величкович',
  } satisfies Record<Lang, string>,

  /**
   * Path to a portrait inside /public, e.g. 'images/teacher.jpg'.
   * Leave empty to show the teacher's initials instead.
   */
  teacherPhoto: '',

  /** City where the studio is. */
  city: { sr: 'Beograd', ru: 'Белград' } satisfies Record<Lang, string>,

  contact: {
    /** PLACEHOLDER: phone number in international format, as it should be displayed. */
    phone: '+381 64 111 111',
    /** PLACEHOLDER: WhatsApp number, digits only with country code (no +, spaces or leading 00). */
    whatsapp: '38164111111',
    /** PLACEHOLDER: Viber number in international format with +, no spaces. */
    viber: '+38164111111',
    /** Instagram username without the @. */
    instagram: 'petarv.53170396',
  },

  /**
   * Numbers shown in the About section. Empty values are hidden;
   * the whole row is hidden while all three are empty.
   */
  stats: {
    years: '', // e.g. '15+'
    students: '', // e.g. '200+'
    ages: '', // e.g. '6–70'
  },

  /** Instagram posts or reels to embed in the gallery (full URLs). */
  instagramPosts: [
    'https://www.instagram.com/reel/CpsO5QIjjxk/',
    'https://www.instagram.com/reel/DWRRMC8ggfj/',
    'https://www.instagram.com/reel/DWG9JTQglAY/',
  ],
};
