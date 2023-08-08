import { getLocalComics } from './getLocalComics';

export const listenMatchMedia = (media: string) => {
  window.matchMedia(media).addEventListener('change', e => {
    if (!e.matches) {
      return;
    }
    getLocalComics();
  });
};
