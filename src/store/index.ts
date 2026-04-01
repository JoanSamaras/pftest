import { configureStore } from '@reduxjs/toolkit';
import { charactersSlice, modalSlice } from './slices';

/** Type Definitions **/
/**********************/

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

/**********************/

export const store = configureStore({
  reducer: {
    characters: charactersSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export type { RootState, AppDispatch };
