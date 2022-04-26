import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserProfile } from '../firestore/profileService';
import { ProfileType } from '../types';

export interface ProfileState {
	currentUserProfile: ProfileType | null;
	status: 'idle' | 'loading' | 'failed';
}

const initialState: ProfileState = {
	currentUserProfile: null,
	status: 'idle',
};

//fetch current user profile
export const fetchCurrentUserAsync = createAsyncThunk(
	'profile/fetchProfile',
	async (userId: string) => {
		return getUserProfile(userId);
	}
);

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setCurrentUserProfile: (state, action) => {
			state.currentUserProfile = action.payload;
		},
		clearCurrentUserProfile: (state) => {
			state.currentUserProfile = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCurrentUserAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCurrentUserAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.currentUserProfile = action.payload as ProfileType;
			});
	},
});

export const { setCurrentUserProfile, clearCurrentUserProfile } =
	profileSlice.actions;

export default profileSlice.reducer;
