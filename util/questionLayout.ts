import {
	ANSWER_BOX_WIDTH,
	MARGIN,
	ANSWER_BOX_HEIGHT,
} from '../theme/constants';

export function calculateOriginalX(index: number): number {
	'worklet';
	let x = 0 + (index - 2) * ANSWER_BOX_WIDTH + MARGIN;

	if (index < 2) {
		x = 0 + index * ANSWER_BOX_WIDTH + MARGIN;
	}
	return x;
}

export function calculateOriginalY(index: number): number {
	'worklet';
	let y = 0;

	if (index > 1) {
		y = ANSWER_BOX_HEIGHT + MARGIN;
	}
	return y;
}
