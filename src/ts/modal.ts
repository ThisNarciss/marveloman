const modal = document.querySelector('.backdrop') as HTMLDivElement;
const comicsList = document.querySelector(
  '.last-comics_list'
) as HTMLImageElement;
const modalBtn = document.querySelector('.modal_btn') as HTMLButtonElement;

comicsList.addEventListener('click', onOpenModal);
modalBtn.addEventListener('click', oncloseModal);
modal.addEventListener('click', onBackdropClick);

function onOpenModal() {
  window.addEventListener('keydown', onEscKeyPress);
  modal.classList.remove('is-hidden');
}

function oncloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  modal.classList.add('is-hidden');
}

function onBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    oncloseModal();
  }
}

function onEscKeyPress(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    oncloseModal();
  }
}
