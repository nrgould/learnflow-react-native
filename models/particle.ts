import { ParticleType } from '../types';

export class Particle implements ParticleType {
	title: string;
	videoUrl?: string;
	creatorId: string;
	question: { text: string; answer: string | number };
	constructor(
		title: string,
		videoUrl: string,
		creatorId: string,
		question: { text: string; answer: string | number }
	) {
		this.title = title;
		this.videoUrl = videoUrl;
		this.creatorId = creatorId;
		this.question = question;
	}
}
