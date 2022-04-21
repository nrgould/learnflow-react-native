import { ModuleType } from './../types.d';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializedParticles } from '../data/dummy-data';
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import { app } from '../firebase/config';
import { auth } from '../firestore/authService';

const db = getFirestore(app);
const user = auth.currentUser;

export interface FeedState {
	feed: ModuleType[];
	status: 'idle' | 'loading' | 'failed';
}

const initialState: FeedState = {
	feed: [],
	status: 'idle',
};

/**
 * Fetches modules for the feed from firestore
 * @param {courseId} the id of the course to fetch modules from
 * @returns {ModuleType[]}
 */
export const fetchFeedAsync = createAsyncThunk(
	'feed/fetchFeed',
	async function (courseId: string) {
		console.log('getting user feed');
		const colRef = collection(db, 'courses', courseId, 'modules');
		const snap = await getDocs(colRef);

		return snap.docs.map((doc) => {
			const data = doc.data();
			return {
				id: doc.id,
				videoUrl: data.video_url,
				title: data.title,
				likeCount: data.like_count,
				creatorId: data.creatorId,
				question: data.question,
			};
		});
	}
);

export const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {
		clearFeed: (state) => {
			state.feed = [];
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchFeedAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchFeedAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.feed = action.payload;
			});
	},
});

export const { clearFeed } = feedSlice.actions;

export default feedSlice.reducer;
