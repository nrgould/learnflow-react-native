import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore/lite';
import { ThemeState } from '../types';
import { app } from '../firebase/config';

const db = getFirestore(app);

const initialState: ThemeState = {
	darkMode: true,
};

export const fetchDarkModeAsync = createAsyncThunk(
	'theme/fetchDarkMode',
	async (userId: string, { dispatch }) => {
		const docRef = doc(db, 'users', userId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			dispatch(setDarkMode(docSnap.data().darkMode));
		}
	}
);

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setDarkMode: (state, { payload }) => {
			const { userId, mode } = payload;
			console.log(payload);
			state.darkMode = mode;
			const docRef = doc(db, 'users', userId);
			updateDoc(docRef, { darkMode: mode });
		},
	},
});

export const { setDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
