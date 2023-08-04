const modal = document.querySelector('.gallery_backdrop') as HTMLDivElement;
const btnModal = document.querySelector(
  '.gallery_modal_btn'
) as HTMLButtonElement;
const bigImg = document.querySelector('.gallery_big-img') as HTMLImageElement;

btnModal.addEventListener('click', onGalleryModalClose);
modal.addEventListener('click', onBackdropClick);

export function onGalleryModalOpen(e: MouseEvent) {
  const img = e.currentTarget as HTMLImageElement;
  const urlImg: string = img.getAttribute('id') as string;
  bigImg.setAttribute('src', `${urlImg}/portrait_uncanny.jpg`);
  modal.classList.remove('is-hidden');
}

function onGalleryModalClose() {
  modal.classList.add('is-hidden');
}

function onBackdropClick(e: MouseEvent) {
  if (e.currentTarget === e.target) {
    onGalleryModalClose();
  }
}
