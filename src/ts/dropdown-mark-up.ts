const dropdown = document.getElementById('browsers') as HTMLDataListElement;

export const dropdownMarkUp = (data: string[]) => {
  dropdown.innerHTML = '';
  const markUp = data.map(item => `<option>${item}</option>`).join('');
  dropdown.insertAdjacentHTML('beforeend', markUp);
};
