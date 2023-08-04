import { Loading, Notify } from 'notiflix';
import { getCharacter, getOneComics } from './api/fetchingComics';
import { modalMarkUp } from './modal-mark-up';
import { onGalleryModalOpen } from './gallery-modal';
import { characterMarkUp } from './character-mark-up';

const modal = document.querySelector('.backdrop') as HTMLDivElement;
const comicsList = document.querySelectorAll(
  '.last-comics_list'
) as NodeListOf<HTMLUListElement>;

const modalBtn = document.querySelector('.modal_btn') as HTMLButtonElement;

comicsList.forEach(item => item.addEventListener('click', onOpenModal));

modalBtn.addEventListener('click', oncloseModal);
modal.addEventListener('click', onBackdropClick);

export function onOpenModal(e: MouseEvent) {
  const { id } = e.target as HTMLElement;
  window.addEventListener('keydown', onEscKeyPress);
  getOneComics(id)
    .then(data => {
      modalMarkUp(data);
      modal.classList.remove('is-hidden');
      document.body.style.overflow = 'hidden';
      const galleryImg = document.querySelectorAll(
        '.gallery_img'
      ) as NodeListOf<HTMLImageElement>;
      const characterImg = document.querySelectorAll(
        '.character_avatar'
      ) as NodeListOf<HTMLImageElement>;

      characterImg.forEach(img =>
        img.addEventListener('click', (e: MouseEvent) => {
          const { id } = e.target as HTMLImageElement;

          getCharacter(id).then(data => characterMarkUp(data));
        })
      );

      galleryImg.forEach(img =>
        img.addEventListener('click', onGalleryModalOpen)
      );
    })
    .catch(error => {
      Notify.failure(error);
      Loading.remove();
    });
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
