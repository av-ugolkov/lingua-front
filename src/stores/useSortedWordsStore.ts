import { create } from 'zustand';

interface SortedWordsState {
  orderType: Sorted;
  setOrderType: (search: Sorted) => void;
  setDefaultOrderType: () => void;
}

export enum Sorted {
  'Newest',
  'Oldest',
  'UpdateAsc',
  'UpdateDesc',
  'AtoZ',
  'ZtoA',
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
