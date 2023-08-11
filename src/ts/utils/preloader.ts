const comicsBox = document.querySelector('.comics-box') as HTMLDivElement;

export const preloader = (limit: number) => {
  const limitArr = [...Array(limit).keys()];

  const markUp = `<ul class="comics-skeleton_list">${limitArr
    .map(
      () => `<li class='comics-skeleton_item'>
  <svg class='comics-skeleton_icon'>
    <use href='/src/images/sprite.svg#skeleton'></use>
  </svg>
</li>`
    )
    .join('')}</ul>`;
  comicsBox.innerHTML = markUp;
};
