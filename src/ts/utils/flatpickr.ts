import flatpickr from 'flatpickr';

const inputElement = document.querySelector(
  '.filter_form_input-date'
) as HTMLInputElement;

flatpickr(inputElement, {
  dateFormat: 'd/m/Y',
});
