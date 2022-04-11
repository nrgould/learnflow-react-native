import { ModuleType, ParticleType } from '../types';

export class Module implements ModuleType {
	content: ParticleType[];
	title: string;
	completedContent: number;
	totalContent: number;
	description: string;
	color: string;
	category: string;
	constructor(
		content: ParticleType[],
		title: string,
		description: string,
		completedContent: number,
		totalContent: number,
		color: string,
		category: string
	) {
		this.content = content;
		this.description = description;
		this.title = title;
		this.completedContent = completedContent;
		this.totalContent = totalContent;
		this.color = color;
		this.category = category
	}
}
