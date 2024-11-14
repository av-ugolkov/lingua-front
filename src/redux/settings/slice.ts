import { createSlice } from '@reduxjs/toolkit/react';

export interface Account {
  Nickname: string;
  Email: string;
}
export interface Security {}
export interface PersonalInfo {
  Name: string;
  Surname: string;
}
export interface EmailNotifications {}

export interface SettingsState {
  account: Account;
  security: Security;
  personalInfo: PersonalInfo;
  emailNotif: EmailNotifications;
}

const initialState: SettingsState = {
  account: { Nickname: '', Email: '' },
  security: {},
  personalInfo: { Name: '', Surname: '' },
  emailNotif: {},
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setAccount: (state, action: { payload: Account }) => {
      state.account = action.payload;
    },
    setSecurity: (state, action: { payload: Security }) => {
      state.security = action.payload;
    },
    setPersonalInfo: (state, action: { payload: PersonalInfo }) => {
      state.personalInfo = action.payload;
    },
    setEmailNotifications: (state, action: { payload: EmailNotifications }) => {
      state.emailNotif = action.payload;
    },
  },
});

export const { setAccount, setSecurity, setEmailNotifications } = slice.actions;

export default slice.reducer;
