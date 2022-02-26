import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializedModules } from '../data/dummy-data';
import { ModuleType } from '../types';

export interface ModuleState {
	selectedModule: ModuleType | null;
	status: 'idle' | 'loading' | 'failed';
}

const initialState: ModuleState = {
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

export const { clearModule } = moduleSlice.actions;

export default moduleSlice.reducer;
