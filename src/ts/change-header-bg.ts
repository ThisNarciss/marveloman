import { throttle } from './utils/throttle';

const header = document.querySelector('header') as HTMLHeadingElement;

let scrollPosition = 0;

window.addEventListener('scroll', throttle(scrollPage, 1000));

function scrollPage() {
  header.style.backgroundColor = 'var(--second-bg-color)';
  scrollPosition = window.scrollY;
  if (!scrollPosition) {
    header.style.backgroundColor = 'transparent';
  }
}
