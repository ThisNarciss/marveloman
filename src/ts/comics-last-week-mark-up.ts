import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { LastComicItem } from './types/types';
import writer from './utils/searchWriter';

const lastComicsSlideOneRef = document.querySelector(
  '.slide-one'
) as HTMLDivElement;
const lastComicsSlideTwoRef = document.querySelector(
  '.slide-two'
) as HTMLDivElement;

interface IData {
  results: LastComicItem[];
}

export const createLastComicsMurkUp = (data: IData) => {
  const { results } = data;

  const murkUpArr = results.map(item => {
    return `
        <li class="last-comics_list_item">
        <article><div class="last-comics_poster-box"><img id=${
          item.id
        }  class="last-comics_list_img" src="https${item.thumbnail.path.slice(
      4
    )}/portrait_uncanny.${
      item.thumbnail.extension
    }" alt="comics article" loading="lazy" width="448" height="519"></div>
        <h3 class="last-comics_list_title">${item.series.name}</h3>
        <p class="last-comics_list_text">${
          writer(item.creators.items)?.name ?? 'No info'
        }</p></article>
        
      </li>
    `;
  });

  const murkUpFirstSlide = [...murkUpArr.slice(0, 3)].join('');
  const murkUpSecondSlide = [...murkUpArr.slice(3)].join('');

  lastComicsSlideOneRef.innerHTML = murkUpFirstSlide;
  lastComicsSlideTwoRef.innerHTML = murkUpSecondSlide;
  Loading.remove();
};
