import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	arrayRemove,
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	writeBatch,
} from 'firebase/firestore/lite';
import { serializedModules } from '../data/dummy-data';
import { app } from '../firebase/config';
import { auth } from '../firestore/authService';
import { getUserCourses } from '../firestore/moduleService';
import { CourseType } from '../types';

const db = getFirestore(app);
const user = auth.currentUser;

export interface CourseState {
	selectedCourse: CourseType | null;
	status: 'idle' | 'loading' | 'failed';
	followingStatus: 'idle' | 'loading' | 'failed';
	courses: CourseType[] | [];
}

const initialState: CourseState = {
	selectedCourse: null,
	status: 'idle',
	courses: [],
	followingStatus: 'idle',
};

function fetchCourses() {
	return new Promise<{ data: any }>((resolve) =>
		setTimeout(() => resolve({ data: serializedModules }), 500)
	);
}

export const fetchCurrentUserCoursesAsync = createAsyncThunk(
	'course/fetchCourses',
	async (userId: string) => {
		return getUserCourses(userId);
	}
);

/**
 * Fetches info for the currently selected course from firestore
 * @param {string} courseId of the course to fetch modules from
 * @returns {CourseType}
 */
export const fetchCourseAsync = createAsyncThunk(
	'course/fetchCourse',
	async function (courseId: string) {
		console.log('getting selected course');
		const courseRef = doc(db, 'courses', courseId);
		const courseSnap = await getDoc(courseRef);

		if (courseSnap.exists()) {
			const course = courseSnap.data();
			const {
				id,
				title,
				description,
				totalContent,
				completedContent,
				color,
				category,
				followers,
			} = course;

			const modulesRef = collection(db, 'courses', courseId, 'modules');
			const modulesSnap = await getDocs(modulesRef);

			const content = modulesSnap.docs.map((modDoc) => {
				const data = modDoc.data();
				return { id: modDoc.id, title: data.title };
			});

			return {
				content,
				id,
				title,
				description,
				totalContent,
				completedContent,
				color,
				category,
				followers,
			};
		} else {
			return null;
		}
	}
);

/**
 * Fetches modules for the currently selected course from firestore
 * @param {string} courseId of the course to fetch modules from
 * @returns {ModuleType[]}
 */
export const fetchCourseModulesAsync = createAsyncThunk(
	'course/fetchCourse',
	async function (courseId: string) {
		console.log('getting selected course');
		const modulesRef = collection(db, 'courses', courseId, 'modules');
		const modulesSnap = await getDocs(modulesRef);

		return modulesSnap.docs.map((doc) => {
			const data = doc.data();
			const id = doc.id;
			const videoUrl = data.video_url;
			const likeCount = data.like_count;
			const creatorId = data.creatorId;
			const question = data.question;
			const title = data.title;
			return { id, videoUrl, title, likeCount, creatorId, question };
		});
	}
);

export const followCourseAsync = createAsyncThunk(
	'course/followCourse',
	async function (data: any) {
		const { courseId, isFollowing } = data;
		console.log('following course');
		console.log(user);
		if (!user) {
			console.log('NO USER');
		}

		const courseRef = doc(db, 'courses', courseId);
		const courseSnap = await getDoc(courseRef);
		const userRef = doc(db, 'users', user!.uid);

		if (courseSnap.exists()) {
			const course = courseSnap.data();
			const batch = writeBatch(db);
			console.log('creating batch');

			const courseObj = {
				id: courseId,
				title: course.title,
			};

			const userObj = {
				id: user!.uid,
				displayName: user!.displayName,
			};

			console.log(isFollowing);
			if (isFollowing) {
				batch.update(courseRef, {
					followers: arrayRemove(userObj),
				});
				batch.update(userRef, {
					courses: arrayRemove(courseObj),
				});
			} else {
				batch.update(courseRef, {
					followers: arrayUnion(userObj),
				});
				batch.update(userRef, {
					courses: arrayUnion(courseObj),
				});
			}

			return batch.commit().then(() => console.log('batch created'));
		} else {
			return Promise.reject("Document doesn't exist!");
		}
	}
);

export const unfollowCourseAsync = createAsyncThunk(
	'course/followCourse',
	async function (courseId: string) {
		console.log('unfollowing course');
		if (!user) {
			return;
		}

		console.log(courseId);

		const courseRef = doc(db, 'courses', courseId);
		const courseSnap = await getDoc(courseRef);
		const userRef = doc(db, 'users', user.uid);

		if (courseSnap.exists()) {
			const course = courseSnap.data();
			console.log(course);

			const batch = writeBatch(db);
			console.log('creating batch');

			batch.update(courseRef, {
				followers: arrayRemove({
					id: user.uid,
					displayName: user.displayName,
				}),
			});
			batch.update(userRef, {
				courses: arrayRemove({
					id: courseId,
					title: course.title,
				}),
			});

			await batch.commit().then(() => console.log('batch created'));
		} else {
			return Promise.reject("Document doesn't exist!");
		}
	}
);

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
			});
	},
});

export const { clearCourse } = courseSlice.actions;

export default courseSlice.reducer;
