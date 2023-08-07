import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { LastComicItem } from './types/types';
import writer from './utils/searchWriter';
import { onOpenModal } from './modal';

const comicsBox = document.querySelector('.comics-box') as HTMLDivElement;

const comicsSection = document.querySelector('.comics') as HTMLDivElement;

interface IData {
  results: LastComicItem[];
}

export const createComicsMurkUp = (data: IData) => {
  const { results } = data;
  comicsBox.innerHTML = '';
  if (!results.length) {
    comicsSection.style.paddingTop = '64px';
  } else {
    comicsSection.style.paddingTop = '0';
  }
  const markUp =
    results.length > 0
      ? `<ul class="comics_list">${results
          .map(item => {
            return `
        <li class="comics_list_item">
        <article><div class="comics_poster-box"><img id=${
          item.id
        }  class="comics_list_img" src="https${item.thumbnail.path.slice(
              4
            )}/portrait_uncanny.${
              item.thumbnail.extension
            }" alt="comics article" loading="lazy" width="332" height="445"></div>
        <h3 class="comics_list_title">${item.series.name}</h3>
        <p class="comics_list_text">${
          writer(item.creators.items)?.name ?? 'No info'
        }</p></article>
        
      </li>
    `;
          })
          .join('')}</ul>`
      : "<div class='no-results_box'><p class='no-results_text'>Try  looking for something else..</p></div>";

  comicsBox.insertAdjacentHTML('beforeend', markUp);
  const comicsList = document.querySelector('.comics_list') as HTMLDivElement;
  comicsList?.addEventListener('click', onOpenModal);
  Loading.remove();
};
