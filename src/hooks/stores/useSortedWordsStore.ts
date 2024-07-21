import { create } from 'zustand';

import { Sorted } from '@/models/Sorted';

export interface SortedWordsState {
  orderType: Sorted;
  setOrderType: (search: Sorted) => void;
  setDefaultOrderType: () => void;
}

export const useSortedWordsStore = create<SortedWordsState>((set) => ({
  orderType: Sorted.Newest,
  setOrderType: (orderType: Sorted) => {
    set({ orderType });
  },
  setDefaultOrderType: () => {
    set({ orderType: Sorted.Newest });
  },
}));
