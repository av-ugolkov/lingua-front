import { create } from 'zustand';

import { Order, Sorted } from '@/models/Sorted';

export interface SortedState {
  sort: Sorted;
  order: Order;
  setOrderType: (s: Sorted, o: Order) => void;
  setDefaultOrderType: () => void;
}

export const useSortedStore = create<SortedState>((set) => ({
  sort: Sorted.Created,
  order: Order.DESC,
  setOrderType: (s: Sorted, o: Order) => {
    set({ sort: s, order: o });
  },
  setDefaultOrderType: () => {
    set({ sort: Sorted.Created, order: Order.DESC });
  },
}));
