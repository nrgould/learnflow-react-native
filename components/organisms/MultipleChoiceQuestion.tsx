import React, { useState } from 'react';
import { useItemHeight } from '../../hooks/useItemHeight';
import { Option } from '../../types';
import Box from '../atoms/Box';
import MultipleChoiceOptions from './MultipleChoiceOptions';
import MultipleChoiceQuestionHeader from './MultipleChoiceQuestionHeader';

const QUESTION = 'x^2 + 6x + 9 = (x + 3) times what?';

const OPTIONS = [
	{ id: '1', content: '(X - 3)', isAnswer: false },
	{ id: '2', content: '(X + 3)', isAnswer: true },
	{ id: '3', content: '(X - 6)', isAnswer: false },
	{ id: '4', content: '(X + 6)', isAnswer: false },
];

export default function MultipleChoiceQuestion() {
	const [answered, setAnswered] = useState(false);

	const onAnswer = (id: string) => {
		const answer = OPTIONS.find((option) => option.id === id);
		if (answer?.isAnswer) {
			console.log('Correct');
			setAnswered(true);
		} else {
			console.log('wrong. Try again');
		}
	};

	const height = useItemHeight();
	return (
		<Box height={height} backgroundColor='background'>
			<Box position='relative' marginHorizontal={'l'} flex={1}>
				<MultipleChoiceQuestionHeader question={QUESTION} />
				<MultipleChoiceOptions onAnswer={onAnswer} options={OPTIONS} />
			</Box>
		</Box>
	);
}
