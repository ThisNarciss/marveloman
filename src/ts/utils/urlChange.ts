export const urlChange = (url: string | undefined, str: string) =>
  url?.slice(url.indexOf(str), url.length);
