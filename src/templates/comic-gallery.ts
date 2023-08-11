type Image = {
  path: string;
  extension: string;
};

export const createComicGalleryMarkUp = (
  img: Image
) => `<li class="gallery_item"><img
      id="https${img.path.slice(4)}"
          class="gallery_img"
          src="https${img.path.slice(4)}/portrait_uncanny.${img.extension}"
          alt="comics cover"
          width="100"
          height="150"
          loading="lazy"
        />
          </li>`;
