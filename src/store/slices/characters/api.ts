import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from 'src/api';
import { endpoints } from 'src/api/endpoints';
import { CharactersResponse } from './types';

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
 async () => {
    // async (page: number = 1) => {
    // `${endpoints.characters}?page=${page}`
    const response = await axiosClient.get<CharactersResponse>(
      `${endpoints.allCharacters}`
    );
    return response.data;
  }
);