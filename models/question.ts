import { QuestionType } from '../types';

export class Question implements QuestionType {
	text: string;
	answer: string | number;
	constructor(text: string, answer: string | number) {
		this.text = text;
		this.answer = answer;
	}
}
