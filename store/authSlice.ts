import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
	authenticated: boolean;
}

const initialState: AuthState = {
	authenticated: false,
};

export const authSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {
		signOut: (state) => {
			state.authenticated = false;
		},
	},
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
