document.addEventListener('DOMContentLoaded', slider);

const btnColor = ['#34387f', '#5b7f3c', '#600404'];

function slider() {
  const sliderImg = document.querySelector('.hero_img-box') as HTMLDivElement;
  const sliderCharacter = document.querySelector(
    '.character_box'
  ) as HTMLDivElement;
  const slidesImgContainer = sliderImg?.querySelector(
    '.img_slides'
  ) as HTMLDivElement;
  const slidesCharacterContainer = sliderCharacter?.querySelector(
    '.character_slides'
  ) as HTMLDivElement;
  const slidesImg = sliderImg?.querySelectorAll(
    '.img_slide'
  ) as NodeListOf<HTMLDivElement>;
  const slidesCharacter = sliderCharacter?.querySelectorAll(
    '.character_slide'
  ) as NodeListOf<HTMLDivElement>;
  const allComicsRef = document.querySelector('.hero_link') as HTMLLinkElement;

  const sliderBtn = document.querySelectorAll(
    '.hero_btn'
  ) as NodeListOf<HTMLButtonElement>;

  const slidesImgHeight = slidesImg[0].offsetHeight;
  const slidesCharacterHeight = slidesCharacter[0].offsetHeight;
  const slidesImgCount = slidesImg.length;
  const slidesCharacterCount = slidesCharacter.length;

  const toSlideImg = (index: number) => {
    if (index < 0 || index >= slidesImgCount) return;

    const transYValue = -slidesImgHeight * index;
    slidesImgContainer.style.transform = `translateY(${transYValue}px)`;
  };
  const toSlideCharacter = (index: number) => {
    if (index < 0 || index >= slidesCharacterCount) return;

    const transYValue = -slidesCharacterHeight * index;
    slidesCharacterContainer.style.transform = `translateY(${transYValue}px)`;
  };

  let previousBtn: null | HTMLButtonElement = null;

  sliderBtn.forEach((btn, idx) => {
    if (idx === 0) {
      previousBtn = btn;
      btn.style.backgroundColor = btnColor[idx];
    }
    btn.addEventListener('click', () => {
      if (previousBtn !== null) {
        previousBtn.style.backgroundColor = 'rgba(23, 23, 23, 0.8)';
      }
      toSlideImg(idx);
      toSlideCharacter(idx);
      btn.style.backgroundColor = btnColor[idx];
      allComicsRef.style.backgroundColor = btnColor[idx];

      previousBtn = btn;

      if (!btnColor[idx]) {
        btn.style.backgroundColor = 'rgba(23, 23, 23, 0.8)';
      }
    });
  });
  // let indexCount = 0;
  // const idx = setInterval(() => {
  //   if (indexCount < 0 || indexCount >= 3) {
  //     indexCount = 0;
  //   }
  //   toSlideImg(indexCount);
  //   toSlideCharacter(indexCount);

  //   indexCount += 1;
  // }, 3000);
}
