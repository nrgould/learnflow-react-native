import { rootReducer } from './store/reducers/rootReducer';
import { store } from './store/store';

export type ThemeState = {
	darkMode: boolean;
};

export type FeedState = {
	content: ParticleType[];
	loading: boolean;
};

export type NavigationTypes = {
	navigation: any;
	route?: any;
};

export type ActionTypes = {
	type: string;
	payload?: any;
};

export type ModuleType = {
	content: ParticleType[];
	title: string;
	description: string;
};

export type UserModuleType = ModuleType & {
	completed: boolean;
	percentComplete: number;
};

export type QuestionType = {
	text: string;
	answer: number | string;
};

export type UserQuestionType = QuestionType & {
	answered: boolean;
};

export type ParticleType = {
	videoUrl?: string;
	creatorId: string;
	question: QuestionType;
};

// export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;
