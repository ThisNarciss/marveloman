const header = document.querySelector(
  'header'
) as HTMLHeadingElement;
console.log(header);

window.addEventListener('scroll', scrollPage);

function scrollPage() {
  header.classList.add('bg-opacity');
}
