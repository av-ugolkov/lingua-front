import { createSlice } from '@reduxjs/toolkit/react';

interface IState {
  nickname: string;
}

const initialState: IState = {
  nickname: '',
};

const slice = createSlice({
  name: 'userStore',
  initialState,
  reducers: {
    setNickname: (state, action: { payload: string }) => {
      state.nickname = action.payload;
    },
  },
  selectors: {
    getNickname: (state) => state.nickname,
  },
});

export const { setNickname } = slice.actions;
export const { getNickname } = slice.selectors;

export default slice.reducer;
