import { string } from "yup";
import { SharedValues } from "./components/AnimatedHelpers/util";
import { rootReducer } from "./store/reducers/rootReducer";
import { store } from "./store/store";

export type ThemeState = {
  darkMode: boolean;
};

export type FeedState = {
  content: ParticleType[];
  loading: boolean;
};

export type User = {
  displayName: string;
  email: string;
  phoneNumber?: string;
  photoURL: string | null;
  uid: string;
};

export type NavigationTypes = {
  navigation: any;
  route?: any;
};

export type ActionTypes = {
  type: string;
  payload?: any;
};

export type CourseUserType = {
  displayName: string;
  id: string;
};

export type CourseModuleType = {
  title: string;
  id: string;
  thumbnail: string;
};

export type CourseType = {
  id: string;
  content: CourseModuleType[];
  title: string;
  description: string;
  completedContent: number;
  totalContent: number;
  color: string;
  category: string;
  followers: CourseUserType[];
};

export type ModuleType = {
  title: string;
  videoUrl: string;
  thumbUrl: string;
  creatorId: string;
  question: QuestionType;
  likeCount: number;
  id: string;
  completed?: boolean;
};

export type QuestionType = {
  questionText: string;
  questionOptions: Option[4];
  attempts: number;
};

export type Option = {
  content: string;
  isAnswer: boolean;
  id: string;
};

export type ProfileType = {
  displayName: string;
  email: string;
  karma: number;
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
