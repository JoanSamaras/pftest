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
      searchName && searchName.length > 0 ? searchName.trim().toLowerCase() : '';
    const sanitizedSearchTvShow =
      searchTvShow && searchTvShow.length > 0 ? searchTvShow.trim().toLowerCase() : '';

    let params = '';
    if (sanitizedSearchTvShow || sanitizedSearchName) {
      if (sanitizedSearchName) {
        if (params.length > 0) {
          params += '&';
        }
        params += `name=${sanitizedSearchName}`;
      }
      if (sanitizedSearchTvShow) {
        if (params.length > 0) {
          params += '&';
        }
        params += `tvShow=${sanitizedSearchTvShow}`;
      }
    } else {
      params = `page=${page}&pageSize=${pageSize}`;
    }

    const response = await axiosClient.get<CharactersResponse>(
      `${endpoints.allCharacters}?${params}`,
    );
    return response.data;
  },
);
