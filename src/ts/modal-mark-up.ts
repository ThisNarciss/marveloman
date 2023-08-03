import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Item } from './types/types';

const modalBoxRef = document.querySelector('.modal_box') as HTMLDivElement;

interface IData {
  results: Item[];
}

export function modalMarkUp(data: IData) {
  const { results } = data;
  const comic = results[0];
  modalBoxRef.innerHTML = '';

  const price = comic.prices.find(item => item.type === 'printPrice')?.price;

  const date = comic.dates
    .find(item => item.type === 'onsaleDate')
    ?.date.slice(0, 4);

  const gallery = comic.images
    .map(
      img => `<li class="gallery_item"><img
          class="gallery_img"
          src="https${img.path.slice(4)}/portrait_uncanny.${img.extension}"
          alt="comics cover"
          width="100"
          height="150"
          loading="lazy"
        />
          </li>`
    )
    .join('');

  const nameSlice = (name: string) => {
    const idx = name.indexOf('(');
    if (idx === -1) {
      return name;
    }
    return name.slice(0, idx);
  };

  const characters = comic.charactersInfo
    .map(
      char =>
        `<li id="${
          char.id
        }" class='characters_item'><img src="https${char.thumbnail.path.slice(
          4
        )}/portrait_medium.${
          char.thumbnail.extension
        }" alt="creator avatar" class="creator_avatar" loading="lazy" width="60"
          height="60"/><h3 class="characters_name">${nameSlice(
            char.name
          )}</h3></li>`
    )
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
          <h2 class="description_title">${comic.title}</h2>
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
          <td class="description_table_data">${date}</td>
          <td class="description_table_data">${comic.pageCount}</td>
          <td class="description_table_data">$${price}</td>
        </tr>
        </tbody>
      </table>
        <div class="creator_box">
          <h2 class="description_title">Creator</h2>
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
        <div class="characters box">
          <h2 class="description_title">Characters</h2>${
            comic.charactersInfo.length > 0
              ? `<ul class="characters_list">${characters}</ul>`
              : '<p class="description_text"> No characters info</p>'
          }
        </div>
      </div>`;

  modalBoxRef.insertAdjacentHTML('beforeend', murkUp);
  Loading.remove();
}
