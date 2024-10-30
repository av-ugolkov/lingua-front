import { createSlice } from '@reduxjs/toolkit';

export interface IEventData {
  ID: string;
  UserID: string;
  Msg: string;
  Watched: boolean;
  CreatedAt: string;
}

const EmptyEvent: IEventData = {
  ID: '',
  UserID: '',
  Msg: '',
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
