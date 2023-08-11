export const getPageLimit = () => {
  const newWidth = window.innerWidth;
  let pageLimit = 0;
  if (newWidth <= 767) {
    pageLimit = 4;
  }
  if (newWidth >= 768 && newWidth <= 1439) {
    pageLimit = 8;
  }

  if (newWidth >= 1440) {
    pageLimit = 16;
  }
  return pageLimit;
};
