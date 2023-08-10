import { Loading, Notify } from 'notiflix';
import {
  getCharacter,
  getCharacterComics,
  getOneComics,
} from '../api/fetchingComics';
import { characterMarkUp } from '../character-mark-up';
import { onGalleryModalOpen } from '../gallery-modal';
import { modalMarkUp } from '../modal-mark-up';

const modal = document.querySelector('.backdrop') as HTMLDivElement;

export const modalModifier = async (id: string) => {
  try {
    const oneComicData = await getOneComics(id);
    modalMarkUp(oneComicData);
    modal.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';

    const galleryImg = document.querySelectorAll(
      '.gallery_img'
    ) as NodeListOf<HTMLImageElement>;
    const characterImg = document.querySelectorAll(
      '.character_avatar'
    ) as NodeListOf<HTMLImageElement>;

    characterImg.forEach(img =>
      img.addEventListener('click', async (e: MouseEvent) => {
        const { id } = e.target as HTMLImageElement;

        const data = await getCharacter(id);
        const comics = await getCharacterComics(data.comics.collectionURI);
        characterMarkUp(data, comics);

        const comicImg = document.querySelectorAll(
          '.character-comics_list_img'
        ) as NodeListOf<HTMLImageElement>;

        comicImg.forEach(img =>
          img.addEventListener('click', (e: MouseEvent) => {
            const { id } = e.target as HTMLImageElement;
            modalModifier(id);
          })
        );
      })
    );

    galleryImg.forEach(img =>
      img.addEventListener('click', onGalleryModalOpen)
    );
  } catch (error: any) {
    Notify.failure(error);
    Loading.remove();
  }
};
