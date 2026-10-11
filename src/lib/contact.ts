import { config } from '../config';
import { dictionaries, type Lang } from '../i18n';

const { contact } = config;

export const links = {
  whatsapp: (lang: Lang) =>
    `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
      dictionaries[lang].contact.whatsappMessage,
    )}`,
  viber: () => `viber://chat?number=${encodeURIComponent(contact.viber.replace(/[^\d+]/g, ''))}`,
  phone: () => `tel:${contact.phone.replace(/[^\d+]/g, '')}`,
  instagram: () => `https://www.instagram.com/${contact.instagram}/`,
  facebook: () => contact.facebook,
};
