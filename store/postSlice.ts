import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { app } from "../firebase/config";
import uuid from "uuid-random";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { QuestionType } from "../types";

const db = getFirestore(app);

export interface PostState {
  post: any;
  progress: number;
  status: "idle" | "loading" | "failed";
}

const initialState: PostState = {
  post: null,
  progress: 0,
  status: "idle",
};

interface CreatePost {
  description: string;
  video: any;
  thumbnail: any;
  courseId: any;
  userId: string;
  title: string;
  question: QuestionType;
}

/**
 * Fetches modules for the feed from firestore
 * @param {} the id of the course to fetch modules from
 * @returns {}
 */
export const createPost = createAsyncThunk("post/createPost", async (data: any, { dispatch }) => {
  try {
    const { description, video, thumbnail, courseId, userId, question, title } = data;
    let storagePostId = uuid();

    const storage = getStorage();
    const storageRef = ref(storage, `post/${userId}/${storagePostId}/video`);

    console.log(video);

    const uploadTask = uploadBytesResumable(storageRef, video, {
      contentType: "video/mov",
      contentDisposition: "",
    });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log("progress:", prog);
        dispatch(setProgress(prog));
      },
      (error) => {
        console.log("ERROR:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at:", downloadURL);
          console.log("adding to firestore");
          const modulesRef = collection(db, "courses", courseId, "modules");
          addDoc(modulesRef, {
            creatorId: userId,
            // thumbnail: thumbURL,
            videoURL: downloadURL,
            description,
            likeCount: 0,
            question,
            title,
          });
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearFeed: (state) => {
      state.post = [];
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state) => {
        state.status = "idle";
      });
  },
});

export const { clearFeed, setProgress } = postSlice.actions;

export default postSlice.reducer;
