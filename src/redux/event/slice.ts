import { createSlice } from '@reduxjs/toolkit';

export interface UserData {
  ID: string;
  Name: string;
  Role: string;
  LastVisitedAt: string;
}

export interface IEventData {
  ID: string;
  User: UserData;
  Type: string;
  Payload: Map<string, any>;
  Watched: boolean;
  CreatedAt: string;
}

const EmptyEvent: IEventData = {
  ID: '',
  User: {
    ID: '',
    Name: '',
    Role: '',
    LastVisitedAt: '',
  },
  Type: '',
  Payload: new Map(),
  Watched: false,
  CreatedAt: '',
};

interface EventsState {
  count: number;
  events: IEventData[];
}

const initialState: EventsState = {
  count: 0,
  events: [],
};

const slice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setCount: (state, action: { payload: number }) => {
      state.count = action.payload;
    },
    setEvent: (state, action: { payload: IEventData }) => {
      state.events.push(action.payload);
    },
    setEvents: (state, action: { payload: IEventData[] }) => {
      state.events = action.payload;
    },
  },
  selectors: {
    getEvent: (state, id: string) => {
      const event = state.events.find((e) => e.ID === id);
      if (!event) {
        return EmptyEvent;
      }
      return event;
    },
  },
});

export const { setCount, setEvent, setEvents } = slice.actions;
export const { getEvent } = slice.selectors;

export default slice.reducer;
