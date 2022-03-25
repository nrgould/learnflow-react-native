import { Option } from '../types';

export function shuffle(array: Option[]) {
	let shuffledArr = [...array];
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[shuffledArr[currentIndex], shuffledArr[randomIndex]] = [
			shuffledArr[randomIndex],
			shuffledArr[currentIndex],
		];
	}

	return shuffledArr;
}
