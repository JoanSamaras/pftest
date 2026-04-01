import { createSlice } from '@reduxjs/toolkit';
import { fetchCharacters } from './api';
import { CharactersState } from './types';

const initialState: CharactersState = {
  info: { count: 0, totalPages: 0, nextPage: null, previousPage: null },
  data: [],
  loading: false,
  error: null,
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = typeof action.payload.data === 'object' && !Array.isArray(action.payload.data)
          ? [action.payload.data]
          : action.payload.data;
        state.info = action.payload.info;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
