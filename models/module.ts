import { ModuleType, ParticleType } from '../types';

export class Module implements ModuleType {
	content: ParticleType[];
	title: string;
	description: string;
	constructor(content: ParticleType[], title: string, description: string) {
		this.content = content;
		this.description = description;
		this.title = title;
	}
}
