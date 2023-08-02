import { toSlide } from './utils/slider';

document.addEventListener('DOMContentLoaded', sliderHeroCharacterImg);

const btnColor = ['#34387f', '#5b7f3c', '#600404'];
const charText = [
  'T’Challa is the king of the secretive and highly advanced African nation of Wakanda - as well as the powerful warrior known as the Black Panther.',
  'Exposed to heavy doses of gamma radiation, scientist Bruce Banner transforms into the mean, green rage machine called the Hulk.',
  'With amazing spider-like abilities, teenage science whiz Peter Parker fights crime and dreams of becoming an Avenger as Spider-Man.',
];
const linearGradient = [
  'linear-gradient(180deg,#34387f 36.46%,rgba(52, 56, 127, 0)100%)',
  '#5B7F3C',
  '#600404',
];

function sliderHeroCharacterImg() {
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
  const characterText = document.querySelector(
    '.character_text'
  ) as HTMLParagraphElement;
  const characterBlur = document.querySelector(
    '.character-blur'
  ) as HTMLDivElement;

  const slidesImgHeight = slidesImg[0].offsetHeight;
  const slidesCharacterHeight = slidesCharacter[0].offsetHeight;
  const slidesImgCount = slidesImg.length;
  const slidesCharacterCount = slidesCharacter.length;

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
      toSlide(
        idx,
        slidesImgCount,
        slidesImgHeight,
        slidesImgContainer,
        'translateY'
      );
      toSlide(
        idx,
        slidesCharacterCount,
        slidesCharacterHeight,
        slidesCharacterContainer,
        'translateY'
      );
      btn.style.backgroundColor = btnColor[idx];
      allComicsRef.style.backgroundColor = btnColor[idx];
      characterText.textContent = charText[idx];
      characterBlur.style.background = linearGradient[idx];

      previousBtn = btn;

      if (!btnColor[idx]) {
        btn.style.backgroundColor = 'rgba(23, 23, 23, 0.8)';
      }
    });
  });
}
