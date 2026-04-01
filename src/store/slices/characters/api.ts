import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from 'src/api';
import { endpoints } from 'src/api/endpoints';
import { CharactersResponse } from './types';

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async ({
    page = 1,
    pageSize = 50,
    searchName,
    searchTvShow,
  }: {
    page?: number;
    pageSize?: number;
    searchName?: string;
    searchTvShow?: string;
  }) => {
    const sanitizedSearchName =
      searchName && searchName.length > 0 ? JSON.stringify(searchName).trim().toLowerCase() : '';
    const sanitizedSearchTvShow =
      searchTvShow && searchTvShow.length > 0
        ? JSON.stringify(searchTvShow).trim().toLowerCase()
        : '';

    const response = await axiosClient.get<CharactersResponse>(
      `${endpoints.allCharacters}?page=${page}&pageSize=${pageSize}${sanitizedSearchName ? `&name=${sanitizedSearchName}` : ''}${sanitizedSearchTvShow ? `&tvShow=${sanitizedSearchTvShow}` : ''}`,
    );
    return response.data;
  },
);
