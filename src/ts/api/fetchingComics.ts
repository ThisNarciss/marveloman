import axios from 'axios';
import md5 from 'md5';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { createLastComicsMurkUp } from '../comics-last-week-mark-up';
import { Notify } from 'notiflix';
import { urlChange } from '../utils/urlChange';
import { CharacterItem, Item, SubmitData } from '../types/types';
import author from '../utils/searchWriter';
import { createComicsMurkUp } from '../comics-mark-up';

const TIME_STAMP = Date.now();
const { VITE_PRIVATE_KEY, VITE_PUBLIC_KEY, VITE_BASE_API_URL } = import.meta
  .env;

const hash = md5(TIME_STAMP + VITE_PRIVATE_KEY + VITE_PUBLIC_KEY);

Loading.init({
  svgSize: '120px',
  svgColor: '#c4c4c4',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
});

axios.defaults.baseURL = VITE_BASE_API_URL;

export const getComics = async (textValue: string) => {
  try {
    Loading.circle();
    if (!textValue) {
      return;
    }
    const {
      data: { data },
    } = await axios.get(
      `/comics?ts=${TIME_STAMP}&apikey=${VITE_PUBLIC_KEY}&hash=${hash}&titleStartsWith=${textValue}&limit=16`
    );

    return data;
  } catch (error: any) {
    return error.message;
  }
};

if (location.pathname === '/comics.html') {
  const searchComic = localStorage.getItem('searchComic') || '';
  if (searchComic) {
    getComics(searchComic)
      .then(data => createComicsMurkUp(data))
      .catch(error => {
        Notify.failure(error);
        Loading.remove();
      });
  }
}

export const getFilteredComics = async (obj: SubmitData) => {
  try {
    Loading.circle();
    const { textValue, formatValue, orderValue, dateValue } = obj;

    let comicsUrlSearch = `/comics?ts=${TIME_STAMP}&apikey=${VITE_PUBLIC_KEY}&hash=${hash}&format=${formatValue}&orderBy=${orderValue}&limit=16`;

    if (textValue) {
      comicsUrlSearch += `&titleStartsWith=${textValue}`;
    }
    if (dateValue) {
      comicsUrlSearch += `&startYear=${dateValue}`;
    }

    const {
      data: { data },
    } = await axios.get(comicsUrlSearch);

    return data;
  } catch (error: any) {
    return error.message;
  }
};

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

if (location.pathname !== '/comics.html') {
  localStorage.setItem('searchComic', '');
  getComicsLastWeek().catch(error => {
    Notify.failure(error);
    Loading.remove();
  });
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
      `${urlChange(
        characters?.collectionURI,
        'comics'
      )}?ts=${TIME_STAMP}&apikey=${VITE_PUBLIC_KEY}&hash=${hash}`
    );

    const charactersInfo = characterData.results.map(
      ({ name, id, thumbnail }: CharacterItem) => {
        return { name, id, thumbnail };
      }
    );

    const writer = author(creators.items);

    let writerInfo: {} | undefined = {};

    if (writer) {
      const {
        data: { data: creatorData },
      } = await axios.get(
        `${urlChange(
          writer.resourceURI,
          'creators'
        )}?ts=${TIME_STAMP}&apikey=${VITE_PUBLIC_KEY}&hash=${hash}`
      );
      const { fullName, thumbnail: avatar } = creatorData.results[0];
      writerInfo = { fullName, avatar };
    } else {
      writerInfo = '';
    }

    const oneComicData = {
      title,
      description: description ?? '',
      thumbnail,
      pageCount,
      format,
      images,
      dates,
      prices,
      writerInfo,
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
