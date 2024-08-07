import { create } from 'zustand';

interface SearchWordState {
  searchWord: string;
  setSearchWord: (search: string) => void;
}

export const useSearchWordStore = create<SearchWordState>((set) => ({
  searchWord: '',
  setSearchWord: (searchWord: string) => {
    set({ searchWord });
  },
}));
