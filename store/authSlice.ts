import { createSlice } from '@reduxjs/toolkit';
import { signOutFirebase } from '../firestore/authService';

export interface AuthState {
	authenticated: boolean;
	userId: string | undefined;
}

const initialState: AuthState = {
	authenticated: false,
	userId: undefined,
};

export const authSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {
		signOut: (state) => {
			signOutFirebase();
			state.authenticated = false;
			state.userId = undefined;
		},
		setUserId: (state, action) => {
			state.userId = action.payload;
		},
	},
});

export const { signOut, setUserId } = authSlice.actions;

export default authSlice.reducer;
