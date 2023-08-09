import { Loading, Notify } from 'notiflix';
import { getFilteredComics } from './api/fetchingComics';
import { createComicsMurkUp } from './comics-mark-up';
import { SubmitData } from './types/types';
import { pagination } from './pagination';

const filterForm = document.querySelector('.filter_form') as HTMLFormElement;

filterForm.addEventListener('submit', handleSubmit);

function handleSubmit(e: Event) {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const inputTextEl = form.elements.namedItem('text') as HTMLInputElement;
  const selectFormatEl = form.elements.namedItem('format') as HTMLSelectElement;
  const selectOrderEl = form.elements.namedItem('order') as HTMLSelectElement;
  const inputDateEl = form.elements.namedItem('date') as HTMLInputElement;

  const textValue: string = inputTextEl.value.trim();
  const formatValue: string =
    selectFormatEl.value !== 'none' ? selectFormatEl.value : '';
  const orderValue: string =
    selectOrderEl.value !== 'none' ? selectOrderEl.value : '';
  const dateValue: string = inputDateEl.value.slice(6);

  const data: SubmitData = { textValue, formatValue, orderValue, dateValue };
  localStorage.setItem('searchComic', JSON.stringify(data));
  getFilteredComics(data)
    .then(data => {
      createComicsMurkUp(data);
      pagination(1, data);
    })
    .catch(error => {
      Notify.failure(error);
      Loading.remove();
    });
}
