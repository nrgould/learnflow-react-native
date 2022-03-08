import { Option, QuestionType } from '../types';

export class Question implements QuestionType {
	text: string;
	options: Option[];
	constructor(text: string, options: Option[]) {
		this.text = text;
		this.options = options;
	}
}
