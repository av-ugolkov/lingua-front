import { create } from 'zustand';

interface SearchState {
  searchValue: string;
  setSearchValue: (search: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchValue: '',
  setSearchValue: (search: string) => {
    set({ searchValue: search });
  },
}));
