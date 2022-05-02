import { ModuleType } from './../types.d';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	addDoc,
	collection,
	doc,
	getDocs,
	getFirestore,
} from 'firebase/firestore/lite';
import { app } from '../firebase/config';
import { v4 as uuid } from 'uuid';
import { saveMediaToStorage } from '../util/saveMediaToStorage';

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
		new Promise((resolve: any, reject) => {
			console.log('uploading video...');
			const { description, video, thumbnail, courseId, userId } = data;
			let storagePostId = uuid();
			console.log(storagePostId);
			let allSavePromises = Promise.all([
				saveMediaToStorage(
					video,
					`post/${userId}/${storagePostId}/video`
				),
				saveMediaToStorage(
					thumbnail,
					`post/${userId}/${storagePostId}/thumbnail`
				),
			]);

			allSavePromises.then((media) => {
				console.log('adding to firestore');
				const modulesRef = collection(
					db,
					'courses',
					courseId,
					'modules'
				);
				addDoc(modulesRef, {
					creatorId: userId,
					media,
					description,
					like_count: 0,
				})
					.then(() => resolve())
					.catch(() => reject());
			});

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
