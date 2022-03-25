import { ParticleType, QuestionType } from '../types';

export class Particle implements ParticleType {
	title: string;
	videoUrl?: string;
	creatorId: string;
	question: QuestionType;
	id: string;
	completed: boolean;
	constructor(
		title: string,
		videoUrl: string,
		creatorId: string,
		question: QuestionType,
		id: string,
		completed: boolean
	) {
		this.title = title;
		this.videoUrl = videoUrl;
		this.creatorId = creatorId;
		this.question = question;
		this.id = id;
		this.completed = completed;
	}
}
