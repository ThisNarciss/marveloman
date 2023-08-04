const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'Jun',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function dateChanger(str: string | undefined) {
  const year = str?.slice(0, 4);
  const monthNum: number = Number(str?.slice(5, 7));
  const month = months[monthNum - 1];

  const day = str?.slice(8, 10);
  return `${month} ${day}, ${year}`;
}
