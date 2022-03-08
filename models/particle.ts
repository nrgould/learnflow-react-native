import { ParticleType, QuestionType } from '../types';

export class Particle implements ParticleType {
	title: string;
	videoUrl?: string;
	creatorId: string;
	question: QuestionType;
	id: string;
	constructor(
		title: string,
		videoUrl: string,
		creatorId: string,
		question: QuestionType,
		id: string
	) {
		this.title = title;
		this.videoUrl = videoUrl;
		this.creatorId = creatorId;
		this.question = question;
		this.id = id;
	}
}
