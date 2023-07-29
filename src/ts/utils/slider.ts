export const toSlide = (...args: any[]) => {
  const [index, slidesCount, slidesSize, slidesContainer, translate] = args;
  if (index < 0 || index >= slidesCount) return;

  const transValue = -slidesSize * index;
  slidesContainer.style.transform = `${translate}(${transValue}px)`;
};
