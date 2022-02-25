import { createSlice } from '@reduxjs/toolkit';
import { ThemeState } from '../types';

const initialState: ThemeState = {
	darkMode: true,
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setDark: (state) => {
			state.darkMode = true;
		},
		setLight: (state) => {
			state.darkMode = false;
		},
	},
});

export const { setDark, setLight } = themeSlice.actions;

export default themeSlice.reducer;
