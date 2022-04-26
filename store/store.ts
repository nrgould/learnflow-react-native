import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import courseReducer from './courseSlice';
import themeReducer from './themeSlice';
import feedReducer from './feedSlice';
import profileReducer from './profileSlice';
import authReducer, { verifyAuth } from './authSlice';

export const store = configureStore({
	reducer: {
		course: courseReducer,
		feed: feedReducer,
		theme: themeReducer,
		profile: profileReducer,
		auth: authReducer,
	},
});

store.dispatch(verifyAuth());

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
