import { ModuleType } from './../types.d';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import { app } from '../firebase/config';
import { v4 as uuid } from 'uuid';

const db = getFirestore(app);

export interface PostState {
	post: any;
	status: 'idle' | 'loading' | 'failed';
}

const initialState: PostState = {
	post: null,
	status: 'idle',
};

interface CreatePost {
	description: string;
	video: any;
	thumbnail: any;
	courseId: any;
	userId: string;
}

/**
 * Fetches modules for the feed from firestore
 * @param {} the id of the course to fetch modules from
 * @returns {}
 */
export const createPost = createAsyncThunk(
	'post/createPost',
	async (data: any, { dispatch }) =>
		new Promise((resolve, reject) => {
			const { description, video, thumbnail, courseId, userId } = data;
			let storagePostId = uuid();
			console.log(storagePostId);
			console.log(data, description);
			return null;
		})
);

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		clearFeed: (state) => {
			state.post = [];
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(createPost.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(createPost.fulfilled, (state) => {
				state.status = 'idle';
			});
	},
});

export const { clearFeed } = postSlice.actions;

export default postSlice.reducer;
