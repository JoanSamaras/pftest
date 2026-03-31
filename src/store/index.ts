import { configureStore } from '@reduxjs/toolkit';
import { charactersSlice } from './slices';

export const store = configureStore({
  reducer: {
    characters: charactersSlice.reducer,
  },
});
