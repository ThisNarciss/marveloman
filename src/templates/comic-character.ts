import { nameSlice } from '../ts/utils/char-name-slice';

type Character = {
  name: string;
  id: number;
  thumbnail: {
    path: string;
    extension: string;
  };
};

export const createComicCharacterMarkUp = (
  character: Character
) => `<li  class='characters_item'><img id="${
  character.id
}" src="https${character.thumbnail.path.slice(4)}/portrait_medium.${
  character.thumbnail.extension
}" alt="creator avatar" class="character_avatar" loading="lazy" width="60"
          height="60"/><h3 class="characters_name">${nameSlice(
            character.name
          )}</h3></li>`;
