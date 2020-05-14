const russianLangLocales = ['ru-BY', 'ru-KG', 'ru-KZ', 'ru-MD', 'ru-RU', 'ru-UA'];

export const getUserLanguage = (): string => {
  if (navigator || navigator in window) {
    const currentLang = (navigator.languages && navigator.languages[0]) || navigator.language;
    if (russianLangLocales.includes(currentLang)) {
      return 'ru-RU';
    }
  }
  return 'en-US';
};
