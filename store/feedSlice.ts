import { ParticleType } from './../types.d';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializedParticles } from '../data/dummy-data';

export interface FeedState {
	feed: ParticleType[];
	status: 'idle' | 'loading' | 'failed';
}

const initialState: FeedState = {
	feed: [],
	status: 'idle',
};

function fetchFeed() {
	return new Promise<{ data: any }>((resolve) =>
		setTimeout(() => resolve({ data: serializedParticles }), 500)
	);
}

//fetch single module
export const fetchFeedAsync = createAsyncThunk(
	'feed/fetchFeed',
	async function () {
		const response = await fetchFeed();
		return response.data;
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
