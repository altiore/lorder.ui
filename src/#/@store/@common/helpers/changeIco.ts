export function changeIco(path: string = '/favicon.ico') {
  const link: any = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = path;
  document.getElementsByTagName('head')[0].appendChild(link);
}
