import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { CharacterData, LastComicItem } from './types/types';
import { dateChanger } from './utils/dateChanger';
import { createCharacterComicsMarkUp } from '../templates/character-comics';

const modalBoxRef = document.querySelector('.modal_box') as HTMLDivElement;

interface IComics {
  results: LastComicItem[];
}

export function characterMarkUp(data: CharacterData, comics: IComics) {
  modalBoxRef.innerHTML = '';
  const { description, name, thumbnail, modified } = data;

  const comicsMarkUp = comics.results.map(createCharacterComicsMarkUp).join('');

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
        <div class="comics_box">
          <h2 class="description_title description_title--padding">List of comics</h2>
          ${
            comics.results.length > 0
              ? `<ul class="character-comics_list">${comicsMarkUp}</ul>`
              : '<p class="description_text"> No comics info</p>'
          }
        </div>
      </div>`;

  modalBoxRef.insertAdjacentHTML('beforeend', markUp);
  Loading.remove();
}
