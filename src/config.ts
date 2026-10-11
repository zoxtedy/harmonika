/**
 * Site details: names, contacts, stats, Instagram posts.
 * Text that differs per language lives in src/i18n/.
 */
import type { Lang } from './i18n';

export const config = {
  /** Teacher's name in each language; with "school" from src/i18n it forms the brand. */
  teacherName: {
    sr: 'Petar Veličković',
    ru: 'Петар Величкович',
  } satisfies Record<Lang, string>,

  /**
   * Path to a portrait inside /public, e.g. 'images/teacher.jpg'.
   * Leave empty to show the teacher's initials instead.
   */
  teacherPhoto: 'images/teacher.webp',

  /** Where lessons take place. */
  location: {
    sr: 'Kaluđerica, Beograd',
    ru: 'Калуджерица, Белград',
  } satisfies Record<Lang, string>,

  contact: {
    /** Phone number in international format, as it should be displayed. */
    phone: '+381 61 2854 390',
    /** WhatsApp number, digits only with country code (no +, spaces or leading 00). */
    whatsapp: '381612854390',
    /** Viber number in international format with +, no spaces. */
    viber: '+381612854390',
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
