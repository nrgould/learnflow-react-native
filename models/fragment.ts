import { FragmentType } from '../types';

export class Fragment implements FragmentType {
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
