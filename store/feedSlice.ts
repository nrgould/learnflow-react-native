import { ModuleType } from "./../types.d";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { app } from "../firebase/config";

const db = getFirestore(app);

export interface FeedState {
  feed: ModuleType[];
  status: "idle" | "loading" | "failed";
}

const initialState: FeedState = {
  feed: [],
  status: "idle",
};

/**
 * Fetches modules for the feed from firestore
 * @param {courseId} the id of the course to fetch modules from
 * @returns {ModuleType[]}
 */
export const fetchFeedAsync = createAsyncThunk("feed/fetchFeed", async function (courseId: string) {
  const colRef = collection(db, "courses", courseId, "modules");
  const snap = await getDocs(colRef);

  return snap.docs.map((doc) => {
    const data = doc.data();

    console.log(data.videoURL);

    return {
      id: doc.id,
      videoUrl: data.videoURL,
      title: data.title,
      likeCount: data.likeCount,
      creatorId: data.creatorId,
      question: data.question,
    };
  });
});

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    clearFeed: (state) => {
      state.feed = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeedAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.feed = action.payload;
      })
      .addCase(fetchFeedAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { clearFeed } = feedSlice.actions;

export default feedSlice.reducer;
