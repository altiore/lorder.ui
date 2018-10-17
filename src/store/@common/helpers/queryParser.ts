export function getQueryParam(query: string, param: string): string | null {
  const vars = query.substr(1).split('&');
  for (const element of vars) {
    const pair = element.split('=');
    if (decodeURIComponent(pair[0]) === param) {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log('Query param %s not found', param);
  return null;
}
