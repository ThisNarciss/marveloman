import { Loading, Notify } from 'notiflix';
import { getFilteredComics } from '../api/fetchingComics';
import { createComicsMurkUp } from '../comics-mark-up';
import { pagination } from '../pagination';

export const getLocalComics = () => {
  const searchComic = JSON.parse(
    localStorage.getItem('searchComic') as string
  ) || { textValue: '' };

  getFilteredComics(searchComic)
    .then(data => {
      createComicsMurkUp(data);
      pagination(1, data);
    })
    .catch(error => {
      Notify.failure(error);
      Loading.remove();
    });
};
