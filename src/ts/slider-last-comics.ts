import { toSlide } from './utils/slider';

document.addEventListener('DOMContentLoaded', sliderLastComics);

function sliderLastComics() {
  const slider = document.querySelector(
    '.last-comics_list-box'
  ) as HTMLDivElement;
  const slidesContainer = slider.querySelector(
    '.last-comics_list-box_slides'
  ) as HTMLDivElement;
  const slides = slider.querySelectorAll(
    '.last-comics_list'
  ) as NodeListOf<HTMLUListElement>;

  const lastComicsBtn = document.querySelectorAll(
    '.last-comics-btn_list_btn'
  ) as NodeListOf<HTMLButtonElement>;

  const slidesContainerWidth = slides[0].offsetWidth;
  const slidesCount = slides.length;

  let prevBtn: HTMLButtonElement | null = null;

  lastComicsBtn.forEach((btn, idx) => {
    if (idx === 0) {
      prevBtn = btn;
      btn.style.backgroundColor = '#0c0b0b';
      btn.style.border = '1px solid rgba(250, 250, 250, 0.3)';
      btn.style.color = 'rgba(250, 250, 250, 0.3)';
    }
    btn.addEventListener('click', () => {
      if (prevBtn !== null) {
        prevBtn.style.backgroundColor = 'var(--second-bg-color)';
        prevBtn.style.border = 'none';
        prevBtn.style.color = '#fafafa';
      }

      btn.style.backgroundColor = '#0c0b0b';
      btn.style.border = '1px solid rgba(250, 250, 250, 0.3)';
      btn.style.color = 'rgba(250, 250, 250, 0.3)';

      prevBtn = btn;
      toSlide(
        idx,
        slidesCount,
        slidesContainerWidth,
        slidesContainer,
        'translateX'
      );
    });
  });
}
