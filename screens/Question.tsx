import React, { useState } from 'react';
import Box from '../components/atoms/Box';
import QuestionOptions from '../components/organisms/QuestionOptions';

const QUESTION = 'x^2 + 6x + 9 = (x + 3) times what?';

const ANSWERS = [
	{ content: '(X - 3)', isAnswer: true },
	{ content: '(X + 3)', isAnswer: true },
	{ content: '(X - 6)', isAnswer: true },
	{ content: '(X + 6)', isAnswer: true },
];

export default function Question() {
	return (
		<Box flex={1} backgroundColor='background'>
			<Box
				position='relative'
				marginHorizontal={'l'}
				borderColor='border'
				borderWidth={1}>
				<QuestionOptions answers={ANSWERS} question={QUESTION} />
			</Box>
		</Box>
	);
}
