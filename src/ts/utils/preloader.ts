const comicsBox = document.querySelector('.comics-box') as HTMLDivElement;

export const preloader = (limit: number) => {
  const limitArr = [...Array(limit).keys()];

  const markUp = `<ul class="comics-skeleton_list">${limitArr
    .map(
      () => `<li class='comics-skeleton_item'>
  <svg class='comics-skeleton_icon'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" width="120px" height="180px" x="0px" y="0px"><title>No Data Found, Not Found, Lost, Searching, Search</title><g data-name="No Data Found, Not Found, Lost, Searching, Search"><path d="M24.71,24.29a1,1,0,0,0-1-.24l-1.9-1.91a8.52,8.52,0,1,0-.71.71l1.91,1.91a1,1,0,0,0,.24.95l2.2,2.19a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41ZM10.2,21.8a7.5,7.5,0,1,1,10.6,0A7.49,7.49,0,0,1,10.2,21.8Z"/><path d="M11.65,16.35a.48.48,0,0,0,.7,0l.65-.64.65.64a.48.48,0,0,0,.7,0,.48.48,0,0,0,0-.7L13.71,15l.64-.65a.49.49,0,0,0-.7-.7l-.65.64-.65-.64a.49.49,0,0,0-.7.7l.64.65-.64.65A.48.48,0,0,0,11.65,16.35Z"/><path d="M16.65,16.35a.48.48,0,0,0,.7,0l.65-.64.65.64a.48.48,0,0,0,.7,0,.48.48,0,0,0,0-.7L18.71,15l.64-.65a.49.49,0,1,0-.7-.7l-.65.64-.65-.64a.49.49,0,0,0-.7.7l.64.65-.64.65A.48.48,0,0,0,16.65,16.35Z"/><path d="M19.5,18h-8a.5.5,0,0,0,0,1H13v1.5a1.5,1.5,0,0,0,3,0V19h3.5a.5.5,0,0,0,0-1ZM15,20.5a.5.5,0,0,1-1,0V19h1Z"/><path d="M25.5,5A2.5,2.5,0,1,0,28,7.5,2.5,2.5,0,0,0,25.5,5Zm0,4A1.5,1.5,0,1,1,27,7.5,1.5,1.5,0,0,1,25.5,9Z"/><path d="M9,6A2,2,0,1,0,7,8,2,2,0,0,0,9,6ZM6,6A1,1,0,1,1,7,7,1,1,0,0,1,6,6Z"/><path d="M8.5,26H8v-.5a.5.5,0,0,0-1,0V26H6.5a.5.5,0,0,0,0,1H7v.5a.5.5,0,0,0,1,0V27h.5a.5.5,0,0,0,0-1Z"/></g><text x="0" y="47" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Anggah Wahyu</text><text x="0" y="52" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>
</li>`
    )
    .join('')}</ul>`;
  comicsBox.innerHTML = markUp;
};
