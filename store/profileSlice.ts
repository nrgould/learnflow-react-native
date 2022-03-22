import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserProfile } from '../firestore/profileService';
import { ProfileType } from '../types';

export interface ProfileState {
	currentUser: ProfileType | null;
	status: 'idle' | 'loading' | 'failed';
}

const initialState: ProfileState = {
	currentUser: null,
	status: 'idle',
};

//fetch current user profile
export const fetchCurrentUserAsync = createAsyncThunk(
	'module/fetchModule',
	async (userId: string) => {
		return getUserProfile(userId);
	}
);

export const profileSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {
		setCurrentUser: (state, action) => {
			state.currentUser = action.payload;
		},
		clearCurrentUser: (state) => {
			state.currentUser = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCurrentUserAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCurrentUserAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.currentUser = action.payload as ProfileType;
			});
	},
});

export const { setCurrentUser, clearCurrentUser } = profileSlice.actions;

export default profileSlice.reducer;
