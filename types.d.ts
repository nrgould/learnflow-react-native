import { SharedValues } from './components/AnimatedHelpers/util';
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
	completedContent: number;
	totalContent: number;
};

export type UserModuleType = ModuleType & {
	completed: boolean;
};

export type QuestionType = {
	text: string;
	answer: number | string;
};

export type UserQuestionType = QuestionType & {
	answered: boolean;
};

export type ParticleType = {
	title: string;
	videoUrl?: string;
	creatorId: string;
	question: QuestionType;
};

export type Offset = SharedValues<{
	order: number;
	width: number;
	height: number;
	x: number;
	y: number;
	originalX: number;
	originalY: number;
}>;