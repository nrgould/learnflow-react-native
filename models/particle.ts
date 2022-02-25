import { ParticleType } from '../types';

export class Particle implements ParticleType {
	videoUrl?: string;
	creatorId: string;
	question: { text: string; answer: string | number };
	constructor(
		videoUrl: string,
		creatorId: string,
		question: { text: string; answer: string | number }
	) {
		this.videoUrl = videoUrl;
		this.creatorId = creatorId;
		this.question = question;
	}
}
