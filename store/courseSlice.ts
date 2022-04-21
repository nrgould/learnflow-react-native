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
import { CourseType, CourseUserType } from '../types';

const db = getFirestore(app);
const user = auth.currentUser;

export interface CourseState {
	selectedCourse: CourseType | null;
	status: 'idle' | 'loading' | 'failed';
	courses: CourseType[] | [];
}

const initialState: CourseState = {
	selectedCourse: null,
	status: 'idle',
	courses: [],
};

function fetchCourse() {
	return new Promise<{ data: CourseType }>((resolve) =>
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
			console.log(courseSnap.data());
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
	async function (courseId: string) {
		try {
			if (!user) {
				return Promise.reject('Must be signed in');
			}

			const courseRef = doc(db, 'courses', courseId);
			const courseSnap = await getDoc(courseRef);
			const userRef = doc(db, 'users', user.uid);

			if (courseSnap.exists()) {
				const course = courseSnap.data();
				const isFollowing = course.followers.some(
					(follower: CourseUserType) => follower.id === user.uid
				);
				const batch = writeBatch(db);

				console.log(isFollowing);
				if (isFollowing) {
					batch.update(courseRef, {
						followers: arrayRemove(user.uid),
					});
					batch.update(userRef, { courses: arrayRemove(courseId) });
				} else {
					batch.update(courseRef, {
						followers: arrayUnion(user.uid),
					});
					batch.update(userRef, { courses: arrayUnion(courseId) });
				}

				await batch.commit();
			} else {
				return Promise.reject("document doesn't exist!");
			}
		} catch (error) {
			throw error;
		}

		//get if user is following the course
		//if not following, add user id to list of students in course doc, and add course id to list of courses in user doc
		//if following, remove user id from followers, and course id from user doc
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
				state.status = 'idle';
			});
	},
});

export const { clearCourse } = courseSlice.actions;

export default courseSlice.reducer;
