export enum Sorted {
  'Created',
  'Updated',
  'Visit',
  'ABC',
  'WordCount',
}

export enum Order {
  'ASC',
  'DESC',
}

export interface ISortType {
  name: string;
  type: Sorted;
}

export const SortWordTypes: ISortType[] = [
  {
    name: 'By created',
    type: Sorted.Created,
  },
  {
    name: 'By update',
    type: Sorted.Updated,
  },
  {
    name: 'By ABC',
    type: Sorted.ABC,
  },
];

export const SortUserTypes: ISortType[] = [
  {
    name: 'By visit',
    type: Sorted.Visit,
  },
  {
    name: 'By name',
    type: Sorted.ABC,
  },
];
