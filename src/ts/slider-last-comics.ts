import { toSlide } from './utils/slider';

document.addEventListener('DOMContentLoaded', sliderLastComics);

function sliderLastComics() {
  const slider = document.querySelector(
    '.last-comics_list-box'
  ) as HTMLDivElement;
  const slidesContainer = slider.querySelector(
    '.last-comics_list-box_slides'
  ) as HTMLDivElement;

  const lastComicsBtn = document.querySelectorAll(
    '.last-comics-btn_list_btn'
  ) as NodeListOf<HTMLButtonElement>;

  const slidesContainerWidth = slider.offsetWidth;
  const allSlidesWidth = slidesContainer.offsetWidth;
  const slidesCount = Math.round(allSlidesWidth / slidesContainerWidth);

  let index = 0;

  lastComicsBtn.forEach((btn, idx) => {
    if (idx === 0) {
      btn.style.backgroundColor = '#0c0b0b';
      btn.style.border = '1px solid rgba(250, 250, 250, 0.3)';
      btn.style.color = 'rgba(250, 250, 250, 0.3)';
    }
    btn.addEventListener('click', () => {
      if (btn.classList.contains('slide-left') && index > 0) {
        index -= 1;
      }
      if (
        btn.classList.contains('slide-right') &&
        index < 5 &&
        index < slidesCount - 1
      ) {
        index += 1;
      }

      if (index > 0) {
        lastComicsBtn[0].style.backgroundColor = 'var(--second-bg-color)';
        lastComicsBtn[0].style.border = 'none';
        lastComicsBtn[0].style.color = '#fafafa';
      } else {
        lastComicsBtn[idx].style.backgroundColor = '#0c0b0b';
        lastComicsBtn[idx].style.border = '1px solid rgba(250, 250, 250, 0.3)';
        lastComicsBtn[idx].style.color = 'rgba(250, 250, 250, 0.3)';
      }

      if (index < slidesCount - 1 && index < 5) {
        lastComicsBtn[1].style.backgroundColor = 'var(--second-bg-color)';
        lastComicsBtn[1].style.border = 'none';
        lastComicsBtn[1].style.color = '#fafafa';
      } else {
        lastComicsBtn[idx].style.backgroundColor = '#0c0b0b';
        lastComicsBtn[idx].style.border = '1px solid rgba(250, 250, 250, 0.3)';
        lastComicsBtn[idx].style.color = 'rgba(250, 250, 250, 0.3)';
      }

      toSlide(
        index,
        slidesCount,
        slidesContainerWidth,
        slidesContainer,
        'translateX'
      );
    });
  });
}
