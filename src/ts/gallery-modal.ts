const modal = document.querySelector('.gallery_backdrop') as HTMLDivElement;
const btnModal = document.querySelector(
  '.gallery_modal_btn'
) as HTMLButtonElement;
const imageBox = document.querySelector('.gallery_modal') as HTMLDivElement;

btnModal.addEventListener('click', onGalleryModalClose);
modal.addEventListener('click', onBackdropClick);

export function onGalleryModalOpen(e: MouseEvent) {
  imageBox.innerHTML = '';
  const img = e.currentTarget as HTMLImageElement;
  const urlImg: string = img.getAttribute('id') as string;
  const imgMarkUp = `<img
      class="gallery_big-img"
      src="${urlImg}/portrait_uncanny.jpg"
      alt="poster"
      width="361"
      height="584"
      loading="lazy"
    />`;
  imageBox.innerHTML = imgMarkUp;
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
