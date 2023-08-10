export const nameSlice = (name: string) => {
  const idx = name.indexOf('(');
  if (idx === -1) {
    return name;
  }
  return name.slice(0, idx);
};
