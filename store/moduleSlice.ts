import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializedModules } from '../data/dummy-data';
import { getUserCourses } from '../firestore/moduleService';
import { ModuleType } from '../types';

export interface ModuleState {
	selectedModule: ModuleType | null;
	status: 'idle' | 'loading' | 'failed';
	modules: ModuleType[] | null;
}

const initialState: ModuleState = {
	selectedModule: null,
	status: 'idle',
	modules: null,
};

export const fetchCurrentUserCoursesAsync = createAsyncThunk(
	'module/fetchCourses',
	async (userId: string) => {
		return getUserCourses(userId);
	}
);

function fetchModule(id: string) {
	return new Promise<{ data: ModuleType }>((resolve) =>
		setTimeout(
			() =>
				resolve({
					data: serializedModules[
						Math.floor(Math.min(Math.random() * 10, 5))
					],
				}),
			500
		)
	);
}

function fetchModules() {
	return new Promise<{ data: any }>((resolve) =>
		setTimeout(() => resolve({ data: serializedModules }), 500)
	);
}

//fetch single module
export const fetchModuleAsync = createAsyncThunk(
	'module/fetchModule',
	async (id: string) => {
		const response = await fetchModule(id);
		return response.data;
	}
);

//fetch all user modules
export const fetchModulesAsync = createAsyncThunk(
	'module/fetchModules',
	async function () {
		const response = await fetchModules();
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
			})
			.addCase(fetchModulesAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchModulesAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.modules = action.payload;
			});
	},
});

export const { clearModule } = moduleSlice.actions;

export default moduleSlice.reducer;
