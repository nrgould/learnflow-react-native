import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializedModules } from '../data/dummy-data';
import { CourseType } from '../types';
import {
	fetchCourseAsync,
	fetchFollowingCourseAsync,
	followCourseAsync,
	setFollowingCourse,
} from './actions/courseActions';

export interface CourseState {
	selectedCourse: CourseType | null;
	followingSelectedCourse: boolean | undefined;
	status: 'idle' | 'loading' | 'failed';
	followingStatus: 'idle' | 'loading' | 'failed';
	courses: CourseType[] | [];
}

const initialState: CourseState = {
	selectedCourse: null,
	status: 'idle',
	courses: [],
	followingStatus: 'idle',
	followingSelectedCourse: false,
};

function fetchCourses() {
	return new Promise<{ data: any }>((resolve) =>
		setTimeout(() => resolve({ data: serializedModules }), 500)
	);
}

//fetch all user courses
export const fetchCoursesAsync = createAsyncThunk(
	'course/fetchCourses',
	async function () {
		const response = await fetchCourses();
		return response.data;
	}
);

export const courseSlice = createSlice({
	name: 'course',
	initialState,
	reducers: {
		clearCourse: (state) => {
			state.selectedCourse = null;
			state.followingSelectedCourse = undefined;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchCourseAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCourseAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.selectedCourse = action.payload;
			})
			.addCase(fetchCourseAsync.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(fetchCoursesAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCoursesAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.courses = action.payload;
			})
			.addCase(followCourseAsync.fulfilled, (state) => {
				state.followingStatus = 'idle';
			})
			.addCase(followCourseAsync.pending, (state) => {
				state.followingStatus = 'loading';
			})
			.addCase(followCourseAsync.rejected, (state) => {
				state.followingStatus = 'failed';
			})
			.addCase(fetchFollowingCourseAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				fetchFollowingCourseAsync.fulfilled,
				(state, { payload }) => {
					state.status = 'idle';
					state.followingSelectedCourse = payload;
				}
			)
			.addCase(setFollowingCourse, (state, { payload }) => {
				state.followingSelectedCourse = payload;
			});
	},
});

export const { clearCourse } = courseSlice.actions;

export default courseSlice.reducer;
