import flatpickr from 'flatpickr';

const inputElement = document.querySelector(
  '.filter_form_input-date'
) as HTMLInputElement;

flatpickr(inputElement, {
  defaultDate: new Date(),
  dateFormat: 'd/m/Y',
});
