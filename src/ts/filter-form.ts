import { Loading, Notify } from 'notiflix';
import { getFilteredComics } from './api/fetchingComics';
import { createComicsMurkUp } from './comics-mark-up';
import { SubmitData } from './types/types';

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
  const formatValue: string = selectFormatEl.value.trim();
  const orderValue: string = selectOrderEl.value.trim();
  const dateValue: string = inputDateEl.value.slice(0, 4).trim();

  const data: SubmitData = { textValue, formatValue, orderValue, dateValue };
  localStorage.setItem('searchComic', '');
  getFilteredComics(data)
    .then(data => {
      createComicsMurkUp(data);
    })
    .catch(error => {
      Notify.failure(error);
      Loading.remove();
    });
}
