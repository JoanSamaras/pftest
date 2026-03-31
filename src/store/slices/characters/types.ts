type Character = {
  _id: number;
  name: string;
  imageUrl: string;
  films: string[];
  tvShows: string[];
  videoGames: string[];
  allies: string[];
  enemies: string[];
}

type CharactersResponse = {
  count: number;
  totalPages: number;
  nextPage: string | null;
  previousPage: string | null;
  data: Character[];
}

type CharactersState = {
  data: Character[];
  loading: boolean;
  error: string | null;
}

export type { Character, CharactersResponse, CharactersState };
