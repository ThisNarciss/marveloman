import axios from 'axios';
import md5 from 'md5';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { createLastComicsMurkUp } from '../comics-last-week-mark-up';
import { Notify } from 'notiflix';

type Item = {
  title: string;
  thumbnail: { path: string; extension: string };
  pageCount: number;
  description: string;
  format: string;
  creators: {
    items:
      | {
          name: string;
          resourceURI: string;
          role: string;
        }[];
  };
  characters: { collectionURI: string };
  images: { path: string; extension: string }[];
  dates: { type: string; date: string }[];
  prices: { type: string; price: number }[];
};

type CharacterItem = {
  name: string;
  thumbnail: { path: string; extension: string };
  id: number;
};
const TIME_STAMP = Date.now();
const { VITE_PRIVATE_KEY, VITE_PUBLIC_KEY } = import.meta.env;

const hash = md5(TIME_STAMP + VITE_PRIVATE_KEY + VITE_PUBLIC_KEY);

Loading.init({
  svgSize: '120px',
  svgColor: '#c4c4c4',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
});

axios.defaults.baseURL = 'https://gateway.marvel.com/v1/public';

const getComicsLastWeek = async () => {
  try {
    Loading.circle();
    const {
      data: { data },
    } = await axios.get(
      `/comics?ts=${TIME_STAMP}&apikey=${VITE_PUBLIC_KEY}&hash=${hash}&dateDescriptor=lastWeek&limit=6`
    );
    createLastComicsMurkUp(data);
    return data;
  } catch (error: any) {
    return error.message;
  }
};

if (location.pathname !== './comics.html') {
  console.log(location);

  getComicsLastWeek().catch(error => Notify.failure(error));
}

export const getOneComics = async (id: string) => {
  try {
    Loading.circle();
    const {
      data: { data: comicData },
    } = await axios.get(
      `/comics/${id}?ts=${TIME_STAMP}&apikey=${VITE_PUBLIC_KEY}&hash=${hash}`
    );

    const {
      characters,
      creators,
      title,
      description,
      thumbnail,
      pageCount,
      format,
      images,
      dates,
      prices,
    }: Item = comicData.results[0];

    const {
      data: { data: characterData },
    } = await axios.get(
      `${characters.collectionURI}?ts=${TIME_STAMP}&apikey=${VITE_PUBLIC_KEY}&hash=${hash}`
    );

    const writer = creators.items.find(
      creator => creator.role === 'writer' || 'editor'
    );

    const {
      data: { data: creatorData },
    } = await axios.get(
      `${writer?.resourceURI}?ts=${TIME_STAMP}&apikey=${VITE_PUBLIC_KEY}&hash=${hash}`
    );

    const { fullName, thumbnail: avatar } = creatorData.results[0];
    const charactersInfo = characterData.results.map(
      ({ name, id, thumbnail }: CharacterItem) => {
        return { name, id, thumbnail };
      }
    );
    const oneComicData = {
      title,
      description: description ?? '',
      thumbnail,
      pageCount,
      format,
      images,
      dates,
      prices,
      creatorsInfo: { fullName, avatar },
      charactersInfo,
    };

    return { results: [oneComicData] };
  } catch (error: any) {
    return error.message;
  }
};

export const searchComics = async (str: string) => {
  try {
    if (str === '') {
      return [];
    }
    const {
      data: { data },
    } = await axios.get(
      `/comics?ts=${TIME_STAMP}&apikey=${VITE_PUBLIC_KEY}&hash=${hash}&titleStartsWith=${str}`
    );

    const searchTitle = data.results.map(
      (item: Item) => item.title
    ) as string[];
    return searchTitle;
  } catch (error: any) {
    return error.message;
  }
};
