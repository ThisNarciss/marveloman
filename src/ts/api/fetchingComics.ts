import axios from 'axios';
import md5 from 'md5';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { createLastComicsMurkUp } from '../comics-last-week-mark-up';

Loading.init({
  svgSize: '120px',
  svgColor: '#c4c4c4',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
});

const TIME_STAMP = Date.now();
const { VITE_PRIVATE_KEY, VITE_PUBLIC_KEY } = import.meta.env;

const hash = md5(TIME_STAMP + VITE_PRIVATE_KEY + VITE_PUBLIC_KEY);

axios.defaults.baseURL = 'https://gateway.marvel.com/v1/public';

const fetchingComicsLastWeek = async () => {
  Loading.circle();
  const {
    data: { data },
  } = await axios.get(
    `/comics?ts=${TIME_STAMP}&apikey=${VITE_PUBLIC_KEY}&hash=${hash}&dateDescriptor=lastWeek&limit=6`
  );
  createLastComicsMurkUp(data);
  return data;
};

fetchingComicsLastWeek();
