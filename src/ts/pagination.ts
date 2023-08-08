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
    paginationBox.innerHTML = '';
    return;
  }
  let markUp = '';
  const pageCount = Math.ceil(total / limit);

  const beforeOnePage = currentPage - 1;
  const beforeTwoPage = currentPage - 2;
  const afterOnePage = currentPage + 1;
  const afterTwoPage = currentPage + 2;
  globalCurrentPage = currentPage;

  if (currentPage === 1) {
    markUp +=
      '<li class="pag_item"><button type="button" disabled="true" class="pag_btn btn-left btn--disabled"><svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.839996 1.41L5.42 6L0.839996 10.59L2.25 12L8.25 6L2.25 0L0.839996 1.41Z" fill="#FAFAFA"/></svg></svg></button></li>';
  } else {
    markUp +=
      '<li class="pag_item"><button type="button" class="pag_btn btn-left btn--enabled"><svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.839996 1.41L5.42 6L0.839996 10.59L2.25 12L8.25 6L2.25 0L0.839996 1.41Z" fill="#FAFAFA"/></svg></svg></button></li>';
  }
  if (currentPage > 1) {
    markUp +=
      '<li class="pag_item"><button type="button" class="pag_btn">1</button></li>';
  }
  if (currentPage > 3) {
    markUp +=
      '<li class="pag_item"><button type="button" class="pag_btn btn-points">...</button></li>';
  }
  if (currentPage === pageCount) {
    markUp += `<li class="pag_item"><button type="button" class="pag_btn">${beforeTwoPage}</button></li>`;
  }

  if (currentPage > 2) {
    markUp += `<li class="pag_item"><button type="button" class="pag_btn">${beforeOnePage}</button></li>`;
  }

  markUp += `<li class="pag_item"><button disabled="true" type="button" class="pag_btn active-pag-btn ">${currentPage}</button></li>`;

  if (pageCount - 1 > currentPage) {
    markUp += `<li class="pag_item"><button type="button" class="pag_btn">${afterOnePage}</button></li>`;
  }
  if (currentPage === 1) {
    markUp += `<li class="pag_item"><button type="button" class="pag_btn">${afterTwoPage}</button></li>`;
  }

  if (pageCount - 2 > currentPage) {
    markUp += `<li class="pag_item"><button type="button" class="pag_btn btn-points">...</button></li>`;
  }
  if (pageCount > currentPage) {
    markUp += `<li class="pag_item"><button type="button" class="pag_btn">${pageCount}</button></li>`;
  }
  if (currentPage === pageCount) {
    markUp +=
      '<li class="pag_item"><button type="button" disabled="true" class="pag_btn btn-right btn--disabled"><svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.839996 1.41L5.42 6L0.839996 10.59L2.25 12L8.25 6L2.25 0L0.839996 1.41Z" fill="#FAFAFA"/></svg></svg></button></li>';
  } else {
    markUp +=
      '<li class="pag_item"><button type="button" class="pag_btn btn-right btn--enabled"><svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.839996 1.41L5.42 6L0.839996 10.59L2.25 12L8.25 6L2.25 0L0.839996 1.41Z" fill="#FAFAFA"/></svg></svg></button></li>';
  }
  paginationBox.innerHTML = `<ul class="pag_list">${markUp}</ul>`;
};

function createPagMarkUp(e: MouseEvent) {
  const el = e.target as HTMLElement;

  if (Boolean(el.closest('.btn-right'))) {
    globalCurrentPage += 1;
    const parseData = JSON.parse(localStorage.getItem('searchComic') as string);
    getFilteredComics(parseData, globalCurrentPage).then(data => {
      createComicsMurkUp(data);
      pagination(globalCurrentPage, data);
    });
    return;
  }

  if (Boolean(el.closest('.btn-left'))) {
    globalCurrentPage -= 1;
    const parseData = JSON.parse(localStorage.getItem('searchComic') as string);
    getFilteredComics(parseData, globalCurrentPage).then(data => {
      createComicsMurkUp(data);
      pagination(globalCurrentPage, data);
    });
    return;
  }

  if (el.nodeName !== 'BUTTON') {
    return;
  }
  if (el.textContent === '...') {
    return;
  }

  const page = Number(el.textContent);
  const parseData = JSON.parse(localStorage.getItem('searchComic') as string);
  getFilteredComics(parseData, page).then(data => {
    createComicsMurkUp(data);
    pagination(page, data);
  });
}
