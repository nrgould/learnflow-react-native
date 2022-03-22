import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import moduleReducer from './moduleSlice';
import themeReducer from './themeSlice';
import feedReducer from './feedSlice';
import profileReducer from './profileSlice';
import authReducer from './authSlice';

export const store = configureStore({
	reducer: {
		module: moduleReducer,
		feed: feedReducer,
		theme: themeReducer,
		profile: profileReducer,
		auth: authReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
