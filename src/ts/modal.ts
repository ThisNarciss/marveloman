import { Notify } from 'notiflix';
import { getOneComics } from './api/fetchingComics';
import { modalMarkUp } from './modal-mark-up';

const modal = document.querySelector('.backdrop') as HTMLDivElement;
const comicsList = document.querySelectorAll(
  '.last-comics_list'
) as NodeListOf<HTMLUListElement>;
const modalBtn = document.querySelector('.modal_btn') as HTMLButtonElement;

comicsList.forEach(item => item.addEventListener('click', onOpenModal));
modalBtn.addEventListener('click', oncloseModal);
modal.addEventListener('click', onBackdropClick);

function onOpenModal(e: MouseEvent) {
  const { id } = e.target as HTMLElement;
  getOneComics(id)
    .then(data => {
      modalMarkUp(data);
      window.addEventListener('keydown', onEscKeyPress);
      modal.classList.remove('is-hidden');
      document.body.style.overflow = 'hidden';
    })
    .catch(error => Notify.failure(error));
}

function oncloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  modal.classList.add('is-hidden');
  document.body.style.overflow = 'auto';
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
