import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import uuid from "uuid-random";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { QuestionType } from "../types";
import { app } from "../firebase/config";

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
 * uploads a video in firebase storage, then creates a module under the specified course referencing the video
 * @param {data} the id of the course to fetch modules from
 * @returns {}
 */
export const createPost = createAsyncThunk(
  "post/createPost",
  async (data: CreatePost, { dispatch }) => {
    try {
      const { description, video, thumbnail, courseId, userId, question, title } = data;
      let storagePostId = uuid();
      const storage = getStorage();

      const thumbBlob: Blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", thumbnail, true);
        xhr.send(null);
      });

      const videoBlob: Blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", video, true);
        xhr.send(null);
      });

      const files = [
        {
          file: video,
          blob: videoBlob,
          path: `post/${userId}/${storagePostId}/video.mov`,
          meta: {
            contentType: "video/mp4",
          },
        },
        {
          file: thumbnail,
          blob: thumbBlob,
          path: `post/${userId}/${storagePostId}/image.jpg`,
          meta: {
            contentType: "image/jpg",
          },
        },
      ];

      const uploadedFiles = await Promise.all(
        files.map(async ({ file, path, blob, meta }, index) => {
          const storageRef = ref(storage, path);
          const uploadTask = uploadBytesResumable(storageRef, blob, meta);
          return new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("progress:", Math.round(prog) + "%", "file #" + index);
                // dispatch(setProgress(prog));
              },
              (error) => {
                console.log("ERROR:", error);
                reject(error);
              },
              async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log("File available at:", downloadURL);
                  resolve(downloadURL);
                });
              }
            );
          });
        })
      );

      const modulesRef = collection(db, "courses", courseId, "modules");
      await addDoc(modulesRef, {
        creatorId: userId,
        videoURL: uploadedFiles[0],
        thumbURL: uploadedFiles[1],
        description,
        likeCount: 0,
        question,
        title,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

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
