import { Notify } from 'notiflix';
import { getComics, searchComics } from './api/fetchingComics';
import { dropdownMarkUp } from './dropdown-mark-up';
import { createComicsMurkUp } from './comics-mark-up';

const searchInput = document.querySelector('.search_input') as HTMLInputElement;
const searchForm = document.querySelector('.search_form') as HTMLFormElement;

searchInput.addEventListener('input', handleSearch);
searchForm.addEventListener('submit', handleSubmit);

function handleSearch(e: Event) {
  const { value } = e.currentTarget as HTMLInputElement;
  searchComics(value.trim())
    .then(data => {
      dropdownMarkUp(data);
    })
    .catch(error => Notify.failure(error));
}

function handleSubmit(e: Event) {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const inputElement = form.elements.namedItem('fav') as HTMLInputElement;

  const value: string = inputElement.value.trim();

  if (location.pathname === ('/index.html' || '/') && value) {
    localStorage.setItem('searchComic', value);
    location.assign('./comics.html');
  }

  if (location.pathname === '/comics.html' && value) {
    localStorage.setItem('searchComic', '');
    getComics(value)
      .then(data => createComicsMurkUp(data))
      .catch(error => Notify.failure(error));
  }
}
