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
  const dataValue: string = inputDateEl.value.trim();

  console.log({ textValue, formatValue, orderValue, dataValue });
}
