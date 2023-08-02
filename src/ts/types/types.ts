export type Item = {
  title: string;
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
