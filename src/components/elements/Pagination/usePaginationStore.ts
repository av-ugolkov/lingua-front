import { create } from 'zustand';

interface PaginationState {
  page: number;
  countItems: number;
  itemsPerPage: number;
  setPage: (value: number) => void;
  setItemsPerPage: (value: number) => void;
  setCountItems: (value: number) => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  page: 1,
  countItems: 0,
  itemsPerPage: 5,
  setPage: (value: number) => {
    set({ page: value });
  },
  setCountItems: (value: number) => {
    set({ countItems: value });
  },
  setItemsPerPage: (value: number) => {
    set({ itemsPerPage: value });
  },
}));
