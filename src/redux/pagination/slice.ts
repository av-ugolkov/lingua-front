import { createSlice } from '@reduxjs/toolkit/react';

interface PaginationState {
  page: number;
  countItems: number;
  itemsPerPage: number;
}

const initialState: PaginationState = {
  page: 1,
  countItems: 0,
  itemsPerPage: 5,
};

const slice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action: { payload: number }) => {
      state.page = action.payload;
    },
    setItemsPerPage: (state, action: { payload: number }) => {
      state.itemsPerPage = action.payload;
    },
    setCountItems: (state, action: { payload: number }) => {
      state.countItems = action.payload;
    },
  },
});

export const { setPage, setItemsPerPage, setCountItems } = slice.actions;

export default slice.reducer;
