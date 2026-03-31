import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from 'src/api';

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (page = 1) => {
    const response = await axiosClient.get(`/character?page=${page}`);
    return response.data;
  }
);

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
