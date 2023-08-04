import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { CharacterData } from './types/types';
import { dateChanger } from './utils/dateChanger';
import { getOneComics } from './api/fetchingComics';

const modalBoxRef = document.querySelector('.modal_box') as HTMLDivElement;

export async function characterMarkUp(data: CharacterData) {
  modalBoxRef.innerHTML = '';
  const { comics, description, name, thumbnail, modified } = data;
  const getId = (str: string) => {
    const idx = str.indexOf('comics');
    const cutStr = str.slice(idx, str.length);
    return cutStr.replace('comics/', '');
  };
  const allComics = comics.items.map(async item => {
    const data = await getOneComics(getId(item.resourceURI));
    return data;
  });

  const comicsData = await Promise.all(allComics);

  const comicsMarkUp = comicsData
    .map(
      item => `
        <li class="last-comics_list_item">
        <article><img id=${
          item.results[0].comicId
        }  class="last-comics_list_img" src="https${item.results[0].thumbnail.path.slice(
        4
      )}/portrait_uncanny.${
        item.results[0].thumbnail.extension
      }" alt="comics article" loading="lazy" width="448" height="519">
        <h3 class="last-comics_list_title">${item.results[0].series.name}</h3>
        <p class="last-comics_list_text">${
          item.results[0].writerInfo.fullName
            ? item.results[0].writerInfo.fullName
            : 'No info'
        }</p></article>
        
      </li>
    `
    )
    .join('');

  const markUp = `<div class="comics_images_box">
        <img
          class="comics_cover"
          src="https${thumbnail.path.slice(4)}/portrait_uncanny.${
    thumbnail.extension
  }"
          alt="comics cover"
          loading="lazy"
          width="332"
          height="445"
        />
      </div>
      <div class="description_box">
        <div class="text_box">
        <div class="title-box"><h2 class="description_title">${name}</h2><p class="description_label">${dateChanger(
    modified
  )}</p></div>
          
          <p class="description_text">${
            description || 'No description info'
          }</p>
        </div>
        <div class="characters box">
          <h2 class="description_title">Characters</h2>${
            comics.items.length > 0
              ? `<ul class="characters_list comics-width">${comicsMarkUp}</ul>`
              : '<p class="description_text"> No comics info</p>'
          }
        </div>
      </div>`;

  modalBoxRef.insertAdjacentHTML('beforeend', markUp);
  Loading.remove();
}
