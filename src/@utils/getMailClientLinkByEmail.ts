const URL_BY_SUFFIX = [
  {
    patterns: [/@gmail\.com$/i],
    url: 'https://mail.google.com/mail/?tab=rm&authuser=0',
  },
];

export default function getMailClientLinkByEmail(email: string): string | null | any {
  let resUrl: string | null = null;
  URL_BY_SUFFIX.forEach(({ patterns, url }) => {
    patterns.forEach(pattern => {
      if (email.match(pattern)) {
        resUrl = url;
      }
    });
  });
  return resUrl;
}
