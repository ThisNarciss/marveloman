import { modalModifier } from './utils/modalModifier';

const modal = document.querySelector('.backdrop') as HTMLDivElement;
const comicsList = document.querySelectorAll(
  '.last-comics_list'
) as NodeListOf<HTMLUListElement>;

const modalBtn = document.querySelector('.modal_btn') as HTMLButtonElement;

comicsList.forEach(item => item.addEventListener('click', onOpenModal));

modalBtn.addEventListener('click', oncloseModal);
modal.addEventListener('click', onBackdropClick);

export function onOpenModal(e: MouseEvent) {
  const { id, nodeName } = e.target as HTMLElement;

  if (nodeName !== 'IMG') {
    return;
  }

  window.addEventListener('keydown', onEscKeyPress);
  modalModifier(id);
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
