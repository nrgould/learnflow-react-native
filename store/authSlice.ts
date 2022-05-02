import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';
import { signOutFirebase, auth } from '../firestore/authService';
import { User } from '../types';

export interface AuthState {
	authenticated: boolean;
	userId: string;
	status: 'idle' | 'loading' | 'failed';
	currentUser: User | null;
}

const initialState: AuthState = {
	authenticated: false,
	currentUser: null,
	userId: '',
	status: 'idle',
};

export const verifyAuth = createAsyncThunk<any>(
	'auth/verifyAuth',
	async (_, { dispatch }) => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const serializedUser = {
					displayName: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
					uid: user.uid,
				};
				dispatch(setUserId(user.uid));
				dispatch(setCurrentUser(serializedUser));
				return serializedUser;
			} else {
				return null;
			}
		});
	}
);

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		signOut: (state) => {
			signOutFirebase();
			state.authenticated = false;
			state.userId = '';
			state.currentUser = null;
		},
		setUserId: (state, action) => {
			state.userId = action.payload;
		},
		setCurrentUser: (state, action) => {
			state.currentUser = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(verifyAuth.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(verifyAuth.fulfilled, (state, { payload }) => {
				if (payload) {
					state.authenticated = true;
				}
				state.status = 'idle';
			})
			.addCase(verifyAuth.rejected, (state) => {
				state.status = 'failed';
			});
	},
});

export const { signOut, setUserId, setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
