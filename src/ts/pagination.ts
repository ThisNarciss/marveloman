import { getFilteredComics } from './api/fetchingComics';
import { createComicsMurkUp } from './comics-mark-up';

interface IData {
  limit: number;
  total: number;
}

let globalCurrentPage = 0;

export const pagination = (currentPage: number, data: IData) => {
  const paginationBox = document.querySelector(
    '.pagination-box'
  ) as HTMLDivElement;
  paginationBox.addEventListener('click', createPagMarkUp);
  const { limit, total } = data;
  if (total === 0) {
    return;
  }
  let markUp = '';
  const pageCount = Math.round(total / limit);

  const beforeOnePage = currentPage - 1;
  const beforeTwoPage = currentPage - 2;
  const afterOnePage = currentPage + 1;
  const afterTwoPage = currentPage + 2;
  globalCurrentPage = currentPage;

  if (currentPage === 1) {
    markUp +=
      '<li class="pag_item"><button type="button" disabled="true" class="pag_btn btn-left btn--disabled">left</button></li>';
  } else {
    markUp +=
      '<li class="pag_item"><button type="button" class="pag_btn btn-left btn--enabled">left</button></li>';
  }
  if (currentPage > 1) {
    markUp +=
      '<li class="pag_item"><button type="button" class="pag_btn">1</button></li>';
  }

  if (currentPage > 3) {
    markUp +=
      '<li class="pag_item"><button type="button" class="pag_btn">...</button></li>';
  }
  if (currentPage === pageCount) {
    markUp += `<li class="pag_item"><button type="button" class="pag_btn">${beforeTwoPage}</button></li>`;
  }

  if (currentPage > 2) {
    markUp += `<li class="pag_item"><button type="button" class="pag_btn">${beforeOnePage}</button></li>`;
  }

  markUp += `<li class="pag_item"><button type="button" class="pag_btn">${currentPage}</button></li>`;
  if (pageCount - 1 > currentPage) {
    markUp += `<li class="pag_item"><button type="button" class="pag_btn">${afterOnePage}</button></li>`;
  }
  if (currentPage === 1) {
    markUp += `<li class="pag_item"><button type="button" class="pag_btn">${afterTwoPage}</button></li>`;
  }

  if (pageCount - 2 > currentPage) {
    markUp += `<li class="pag_item"><button type="button" class="pag_btn">...</button></li>`;
  }
  if (pageCount > currentPage) {
    markUp += `<li class="pag_item"><button type="button" class="pag_btn">${pageCount}</button></li>`;
  }
  if (currentPage === pageCount) {
    markUp +=
      '<li class="pag_item"><button type="button" disabled="true" class="pag_btn btn-right btn--disabled">right</button></li>';
  } else {
    markUp +=
      '<li class="pag_item"><button type="button" class="pag_btn btn-right btn--enabled">right</button></li>';
  }
  paginationBox.innerHTML = `<ul class="pag_list">${markUp}</ul>`;
};

function createPagMarkUp(e: MouseEvent) {
  const el = e.target as HTMLElement;

  if (el.nodeName !== 'BUTTON') {
    return;
  }
  if (el.textContent === '...') {
    return;
  }

  if (el.classList.contains('btn-right')) {
    globalCurrentPage += 1;
    const parseData = JSON.parse(localStorage.getItem('searchComic') as string);
    getFilteredComics(parseData, globalCurrentPage).then(data => {
      createComicsMurkUp(data);
      pagination(globalCurrentPage, data);
    });
    return;
  }

  if (el.classList.contains('btn-left')) {
    globalCurrentPage -= 1;
    const parseData = JSON.parse(localStorage.getItem('searchComic') as string);
    getFilteredComics(parseData, globalCurrentPage).then(data => {
      createComicsMurkUp(data);
      pagination(globalCurrentPage, data);
    });
    return;
  }

  const page = Number(el.textContent);
  const parseData = JSON.parse(localStorage.getItem('searchComic') as string);
  getFilteredComics(parseData, page).then(data => {
    createComicsMurkUp(data);
    pagination(page, data);
  });
}
