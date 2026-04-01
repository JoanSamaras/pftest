type Character = {
  _id: number;
  name: string;
  imageUrl: string;
  films: string[];
  tvShows: string[];
  videoGames: string[];
  allies: string[];
  enemies: string[];
};

type ResponseInfo = {
  count: number;
  totalPages: number;
  nextPage: string | null;
  previousPage: string | null;
};

type CharactersResponse = {
  info: ResponseInfo;
  data: Character[];
};

type CharactersState = {
  info: ResponseInfo;
  data: Character[];
  loading: boolean;
  error: string | null;
};

export type { Character, CharactersResponse, CharactersState };
