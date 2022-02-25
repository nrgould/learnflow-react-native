import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializedModules } from '../data/dummy-data';

const initialState = {
	selectedModule: null,
	status: 'idle',
};

function fetchModule(id: number) {
	return new Promise<{ data: any }>((resolve) =>
		setTimeout(() => resolve({ data: serializedModules[id] }), 500)
	);
}

export const fetchModuleAsync = createAsyncThunk(
	'module/fetchModule',
	async function () {
		const response = await fetchModule(0);
		// console.log(response.data);
		return response.data;
	}
);

export const moduleSlice = createSlice({
	name: 'module',
	initialState,
	reducers: {
		clearModule: (state) => {
			state.selectedModule = null;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchModuleAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchModuleAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.selectedModule = action.payload;
			});
	},
});

export const actions = moduleSlice.actions;

export default moduleSlice.reducer;
