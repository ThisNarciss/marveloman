import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Item } from './types/types';
import { dateChanger } from './utils/dateChanger';
import { date, price } from './utils/searchData';
import { createComicGalleryMarkUp } from '../templates/comic-gallery';
import { createComicCharacterMarkUp } from '../templates/comic-character';

const modalBoxRef = document.querySelector('.modal_box') as HTMLDivElement;

interface IData {
  results: Item[];
}

export function modalMarkUp(data: IData) {
  const { results } = data;
  const comic = results[0];
  modalBoxRef.innerHTML = '';

  const gallery = comic.images.map(createComicGalleryMarkUp).join('');

  const characters = comic.charactersInfo
    .map(createComicCharacterMarkUp)
    .join('');

  const murkUp = `<div class="comics_images_box">
        <img
          class="comics_cover"
          src="https${comic.thumbnail.path.slice(4)}/portrait_uncanny.${
    comic.thumbnail.extension
  }"
          alt="comics cover"
          loading="lazy"
          width="332"
          height="445"
        />
        ${
          comic.images.length > 1
            ? `<ul class='gallery_list'>${gallery}</ul>`
            : ''
        }
      </div>
      <div class="description_box">
        <div class="text_box">
        <div class="title-box"><h2 class="description_title">${
          comic.series.name
        }</h2>${`<p class="description_label">${
    comic.writerInfo
      ? `<span class="description_writer-name">${comic.writerInfo.fullName}</span>`
      : 'No writer'
  } | ${dateChanger(date(comic.dates))}</p>`}</div>
          
          <p class="description_text">${
            comic.description || 'No description info'
          }</p>
        </div>
        <table class="description_table">
        <thead class="description_table_header">
        <tr class="description_table_row">
          <th class="description_table_head">Format</th>
          <th class="description_table_head">Year released</th>
          <th class="description_table_head">Pages</th>
          <th class="description_table_head">Price</th>
        </tr>
        </thead>
        <tbody>
        <tr class="description_table_row">
          <td class="description_table_data">${comic.format}</td>
          <td class="description_table_data">${date(comic.dates)?.slice(
            0,
            4
          )}</td>
          <td class="description_table_data">${comic.pageCount}</td>
          <td class="description_table_data">$${price(comic.prices)}</td>
        </tr>
        </tbody>
      </table>
        <div class="creator_box">
          <h2 class="description_title creator">Creator</h2>
          ${
            comic.writerInfo
              ? `<div class="creator_content"><img src="https${comic.writerInfo.avatar.path.slice(
                  4
                )}/portrait_medium.${
                  comic.writerInfo.avatar.extension
                }" alt="creator avatar" class="creator_avatar" width='60' height='60' loading="lazy"/>
          <div class="creator-info_box">
            <p class="creator_text">Writer</p>
            <h3 class="creator_name">${comic.writerInfo.fullName}</h3>
          </div></div>`
              : '<p class="creator_text">No writer info</p>'
          }
          
        </div>
        <div class="characters_box">
          <h2 class="description_title character">Characters</h2>${
            comic.charactersInfo.length > 0
              ? `<ul class="characters_list">${characters}</ul>`
              : '<p class="description_text"> No characters info</p>'
          }
        </div>
      </div>`;

  modalBoxRef.insertAdjacentHTML('beforeend', murkUp);
  Loading.remove();
}
