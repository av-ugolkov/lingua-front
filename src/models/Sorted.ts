export enum Sorted {
  'Newest',
  'Oldest',
  'UpdateAsc',
  'UpdateDesc',
  'AtoZ',
  'ZtoA',
}

export interface ISortType {
  name: string;
  type: Sorted;
}

export const SortTypes: ISortType[] = [
  {
    name: 'Newest',
    type: Sorted.Newest,
  },
  {
    name: 'Oldest',
    type: Sorted.Oldest,
  },
  {
    name: 'Update asc',
    type: Sorted.UpdateAsc,
  },
  {
    name: 'Update desc',
    type: Sorted.UpdateDesc,
  },
  {
    name: 'A to Z',
    type: Sorted.AtoZ,
  },
  {
    name: 'Z to A',
    type: Sorted.ZtoA,
  },
];
