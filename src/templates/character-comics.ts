import { LastComicItem } from '../ts/types/types';
import writer from '../ts/utils/searchData';

export function createCharacterComicsMarkUp(item: LastComicItem) {
  return `<li class="character-comics_list_item">
          <article><div class="character-comics_list_img-box"><img id=${
            item.id
          }  class="character-comics_list_img" src="https${item.thumbnail.path.slice(
    4
  )}/portrait_fantastic.${
    item.thumbnail.extension
  }" alt="comics article" loading="lazy" width="174" height="200"></div> 
          <h3 class="character-comics_list_title">${item.series.name}</h3>
          <p class="character-comics_list_text">${
            writer(item.creators.items)?.name ?? 'No info'
          }</p></article>

        </li>`;
}
