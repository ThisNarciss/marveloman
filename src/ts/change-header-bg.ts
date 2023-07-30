import { throttle } from './utils/throttle';

const header = document.querySelector('header') as HTMLHeadingElement;

let scrollPosition = 0;

window.addEventListener('scroll', throttle(scrollPage, 1000));

function scrollPage() {
  header.style.backgroundColor = 'rgb(12, 11, 11)';
  scrollPosition = window.scrollY;
  if (!scrollPosition) {
    header.style.backgroundColor = 'rgba(12, 11, 11, 0)';
  }
}
