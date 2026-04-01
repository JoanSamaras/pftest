import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState } from './types';

const initialState: ModalState = {
  open: false,
  data: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<any>) => {
      state.open = true;
      state.data = action.payload;
    },
    closeModal: (state) => {
      state.open = false;
      state.data = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
