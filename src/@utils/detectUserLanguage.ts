import get from 'lodash/get';
import intersectionBy from 'lodash/intersectionBy';
import toLower from 'lodash/toLower';

export enum LOCALE {
  RU = 'ru',
  EN = 'en',
}

const PREFERRED_LOCALES_ORDER: Array<{ locale: LOCALE; friendly: string[] }> = [
  {
    friendly: ['ru', 'ru-BY', 'ru-KG', 'ru-KZ', 'ru-MD', 'ru-RU', 'ru-UA'],
    locale: LOCALE.RU,
  },
  {
    friendly: ['en'],
    locale: LOCALE.EN,
  },
];

export const getUserLanguage = (): LOCALE => {
  if (typeof window !== 'undefined') {
    let languageList: string[] = [];
    if (navigator || navigator in window) {
      if (window.navigator.languages) {
        languageList = languageList.concat(window.navigator.languages);
      }
      if (window.navigator.language) {
        languageList.push(window.navigator.language);
      }
      if (get(window.navigator, 'userLanguage')) {
        languageList.push(get(window.navigator, 'userLanguage'));
      }
      if (get(window.navigator, 'browserLanguage')) {
        languageList.push(get(window.navigator, 'browserLanguage'));
      }
      if (get(window.navigator, 'systemLanguage')) {
        languageList.push(get(window.navigator, 'systemLanguage'));
      }
      const localeIndex = PREFERRED_LOCALES_ORDER.findIndex(({ friendly }) => {
        return Boolean(intersectionBy(languageList, friendly, toLower).length);
      });
      if (localeIndex !== -1) {
        return PREFERRED_LOCALES_ORDER[localeIndex].locale;
      }
    }
  }

  return LOCALE.RU;
};
