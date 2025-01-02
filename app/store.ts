// app/store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Locale } from './i18n/locales';

interface AppState {
  darkMode: {
    isDarkMode: boolean;
  };
  language: {
    current: Locale;
  };
}

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    isDarkMode: false
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    }
  }
});

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    current: 'cn' as Locale
  },
  reducers: {
    setLanguage: (state, action: PayloadAction<Locale>) => {
      state.current = action.payload;
    }
  }
});

export const { toggleDarkMode } = darkModeSlice.actions;
export const { setLanguage } = languageSlice.actions;

export const store = configureStore({
  reducer: {
    darkMode: darkModeSlice.reducer,
    language: languageSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;