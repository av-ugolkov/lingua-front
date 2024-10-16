import { Order, Sorted } from '@/models/Sorted';
import { createSlice } from '@reduxjs/toolkit/react';

interface SearchState {
  searchValue: string;
  sort: Sorted;
  order: Order;
}

const initialState: SearchState = {
  searchValue: '',
  sort: Sorted.Created,
  order: Order.DESC,
};

const slice = createSlice({
  name: 'searchAndOrder',
  initialState,
  reducers: {
    setSearchValue: (state, action: { payload: string }) => {
      state.searchValue = action.payload;
    },
    setOrderType: (state, action: { payload: { s: Sorted; o: Order } }) => {
      state.sort = action.payload.s;
      state.order = action.payload.o;
    },
  },
});

export const { setSearchValue, setOrderType } = slice.actions;

export default slice.reducer;
