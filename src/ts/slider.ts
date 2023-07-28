document.addEventListener('DOMContentLoaded', slider);

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
  const pantherBtn = document.querySelector(
    '.hero_btn-panther'
  ) as HTMLButtonElement;
  const hulkBtn = document.querySelector('.hero_btn-hulk') as HTMLButtonElement;
  const spiderBtn = document.querySelector(
    '.hero_btn-spider'
  ) as HTMLButtonElement;
  const allComicsRef = document.querySelector('.hero_link') as HTMLLinkElement;

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
  pantherBtn.addEventListener('click', () => {
    toSlideImg(0);
    toSlideCharacter(0);
    pantherBtn.style.backgroundColor = '#34387f';
    hulkBtn.style.backgroundColor = 'rgba(23, 23, 23, 0.8)';
    spiderBtn.style.backgroundColor = 'rgba(23, 23, 23, 0.8)';
    allComicsRef.style.backgroundColor = '#34387f';
  });
  hulkBtn.addEventListener('click', () => {
    toSlideImg(1);
    toSlideCharacter(1);
    pantherBtn.style.backgroundColor = 'rgba(23, 23, 23, 0.8)';
    hulkBtn.style.backgroundColor = '#5b7f3c';
    spiderBtn.style.backgroundColor = 'rgba(23, 23, 23, 0.8)';
    allComicsRef.style.backgroundColor = '#5b7f3c';
  });
  spiderBtn.addEventListener('click', () => {
    toSlideImg(2);
    toSlideCharacter(2);
    pantherBtn.style.backgroundColor = 'rgba(23, 23, 23, 0.8)';
    hulkBtn.style.backgroundColor = 'rgba(23, 23, 23, 0.8)';
    spiderBtn.style.backgroundColor = '#600404';
    allComicsRef.style.backgroundColor = '#600404';
  });
  // let indexCount = 0;
  // const idx = setInterval(() => {
  //   if (indexCount < 0 || indexCount >= 3) {
  //     indexCount = 0;
  //   }
  //   toSlideImg(indexCount);
  //   toSlideCharacter(indexCount);
  //   indexCount += 1;
  // }, 1000);
}
