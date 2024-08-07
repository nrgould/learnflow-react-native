import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
  writeBatch,
} from "firebase/firestore/lite";
import { app } from "../../firebase/config";
import { User } from "../../types";

const db = getFirestore(app);

export const setFollowingCourse = createAction<boolean | undefined>("course/setFollowing");

export const fetchCurrentUserCoursesAsync = createAsyncThunk(
  "course/fetchCourses",
  async (userId: string) => {
    const coursesRef = collection(db, "users", userId, "courses");
    const coursesSnap = await getDocs(coursesRef);

    return coursesSnap.docs.map((course) => {
      console.log(course.data());
      return course.data();
    });
  }
);

interface CreateCourse {
  title: string;
  description: string;
  category: string;
  color: string;
  userId: string;
}

/**
 * adds a course to firestore
 * @param {string} userId id of the user which will be the name of the following document
 * @returns {string} the id of the document
 */
export const createCourse = createAsyncThunk("course/createCourse", async (data: CreateCourse) => {
  const { title, description, category, color, userId } = data;
  console.log("creating course");

  const ref = collection(db, "courses");
  addDoc(ref, {
    title,
    description,
    category,
    creatorId: userId,
    color,
  })
    .then((document) => {
      return document.id;
    })
    .catch((error) => {
      throw error;
    });
});

/**
 * adds a course to firestore
 * @param {string} userId id of the user which will be the name of the following document
 * @returns {Array} array of objects with course name and id
 */
export const fetchUserCreatedCourses = createAsyncThunk(
  "course/fetchCreatedCourses",
  async (userId: string) => {
    const ref = collection(db, "courses");
    const q = query(ref, where("creatorId", "==", userId));

    const courses: { id: string; title: string; color: string }[] = [];

    const querySnap = await getDocs(q);
    querySnap.forEach((doc) => {
      const data = doc.data();
      // console.log(doc.id, " => ", doc.data());
      courses.push({ id: doc.id, title: data.title, color: data.color });
    });
    return courses;
  }
);

/**
 * Fetches whether or not the current user is following the course
 * @param {string} courseId id of the course check for following
 * @param {string} userId id of the user which will be the name of the following document
 * @returns {boolean} true if following
 */
export const fetchFollowingCourseAsync = createAsyncThunk(
  "course/fetchFollowingCourse",
  async (data: { courseId: string; userId: string }) => {
    const { courseId, userId } = data;
    const userFollowingSnap = await getDoc(doc(db, "courses", courseId, "followers", userId));

    return userFollowingSnap.exists();
  }
);

/**
 * Fetches info for the currently selected course from firestore
 * @param {string} courseId of the course to fetch modules from
 * @returns {CourseType}
 */
export const fetchCourseAsync = createAsyncThunk(
  "course/fetchCourse",
  async (data: { courseId: string; userId: string }, { rejectWithValue }) => {
    const { courseId } = data;
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (courseSnap.exists()) {
      const course = courseSnap.data();
      const { id, title, description, totalContent, completedContent, color, category, followers } =
        course;

      const modulesSnap = await getDocs(collection(db, "courses", courseId, "modules"));

      const content = modulesSnap.docs.map((modDoc) => {
        return { id: modDoc.id, title: modDoc.data().title, thumbnail: modDoc.data().thumbURL };
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
      return rejectWithValue("No data.");
    }
  }
);

/**
 * Fetches modules for the currently selected course from firestore
 * @param {string} courseId of the course to fetch modules from
 * @returns {ModuleType[]}
 */
export const fetchCourseModulesAsync = createAsyncThunk(
  "course/fetchCourse",
  async function (courseId: string) {
    console.log("getting selected course");
    const modulesRef = collection(db, "courses", courseId, "modules");
    const modulesSnap = await getDocs(modulesRef);

    return modulesSnap.docs.map((modDoc) => {
      const data = modDoc.data();
      const id = modDoc.id;
      const videoUrl = data.videoUrl;
      const thumbUrl = data.thumbUrl;
      const likeCount = data.likeCount;
      const creatorId = data.creatorId;
      const question = data.question;
      const title = data.title;
      return { id, videoUrl, thumbUrl, title, likeCount, creatorId, question };
    });
  }
);

interface Data {
  courseId: string;
  user: User;
  isFollowing: boolean;
}

export const followCourseAsync = createAsyncThunk(
  "course/followCourse",
  async function (data: Data, { dispatch }) {
    const { courseId, user, isFollowing } = data;

    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (courseSnap.exists()) {
      try {
        const course = courseSnap.data();
        const followerRef = doc(db, "courses", courseId, "followers", user.uid);
        const followingRef = doc(db, "users", user.uid, "courses", courseId);

        const batch = writeBatch(db);

        if (isFollowing) {
          batch.delete(followerRef);
          batch.delete(followingRef);
        } else {
          batch.set(followerRef, {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
          batch.set(followingRef, {
            id: courseId,
            title: course.title,
            completed: false,
            totalContent: course.totalContent,
            completedContent: course.completedContent,
            color: course.color,
          });
        }

        return batch.commit();
      } catch (error) {
        throw error;
      } finally {
        dispatch(setFollowingCourse(!isFollowing));
      }
    } else {
      return Promise.reject("Document doesn't exist!");
    }
  }
);
