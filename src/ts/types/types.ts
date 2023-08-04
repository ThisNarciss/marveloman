export type Item = {
  id: string;
  title: string;
  series: { name: string };
  thumbnail: { path: string; extension: string };
  pageCount: number;
  description: string;
  format: string;
  creators: {
    items: {
      name: string;
      resourceURI: string;
      role: string;
    }[];
  };
  characters: { collectionURI: string };
  writerInfo: {
    fullName: string;
    avatar: { path: string; extension: string };
  };
  charactersInfo: {
    name: string;
    id: number;
    thumbnail: { path: string; extension: string };
  }[];
  images: { path: string; extension: string }[];
  dates: { type: string; date: string }[];
  prices: { type: string; price: number }[];
};

export type CharacterItem = {
  name: string;
  thumbnail: { path: string; extension: string };
  id: number;
};

export type Creator = {
  name: string;
  resourceURI: string;
  role: string;
};

export type LastComicItem = {
  id: number;
  thumbnail: { path: string; extension: string };
  series: { name: string };
  creators: { items: Creator[] };
};

export type SubmitData = {
  textValue: string;
  formatValue: string;
  orderValue: string;
  dateValue: string;
};

export type CharacterData = {
  comics: { items: { resourceURI: string; name: string }[] };
  description: string;
  name: string;
  thumbnail: { extension: string; path: string };
  modified: string;
};
