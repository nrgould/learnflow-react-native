import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser, signOutFirebase } from '../firestore/authService';

export interface AuthState {
	authenticated: boolean;
	userId: string | undefined;
	status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
	authenticated: false,
	userId: undefined,
	status: 'idle',
};

// export const fetchUserIdAsync = createAsyncThunk('auth/fetchUser', async () => {
// 	const result = fetchUser();
// 	console.log(result);
// });

export const authSlice = createSlice({
	name: 'auth',
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
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(fetchUserIdAsync.pending, (state) => {
	// 			state.status = 'loading';
	// 		})
	// 		.addCase(fetchUserIdAsync.fulfilled, (state, action) => {
	// 			state.status = 'idle';
	// 			state.userId = action.payload;
	// 		});
	// },
});

export const { signOut, setUserId } = authSlice.actions;

export default authSlice.reducer;
