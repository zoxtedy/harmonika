import { ru } from './ru';
import { sr } from './sr';

export type { Dict } from './sr';

export const langs = ['sr', 'ru'] as const;
export type Lang = (typeof langs)[number];

export const defaultLang: Lang = 'sr';

export const dictionaries = { sr, ru };

export const langLabels: Record<Lang, string> = {
  sr: 'Srpski',
  ru: 'Русский',
};

/** Root-relative URL of a language's home page, honouring the configured base path. */
export function homeUrl(lang: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  return lang === defaultLang ? base : `${base}${lang}/`;
}
