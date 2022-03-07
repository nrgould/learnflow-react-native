import React from 'react';
import { ANSWER_HEIGHT } from '../../theme/layout';
import Box from '../atoms/Box';
import Card from '../atoms/Card';
import Text from '../atoms/Text';

interface Props {
	question: string;
}

export default function MultipleChoiceQuestionHeader({ question }: Props) {
	return (
		<Box
			height={ANSWER_HEIGHT}
			alignItems='flex-start'
			justifyContent={'center'}>
			<Text variant='subheader' color='secondary' marginBottom='m'>
				Practice
			</Text>
			<Card
				variant='answerBox'
				borderStyle='dashed'
				alignItems='center'
				justifyContent='center'
				padding='m'
				width='100%'>
				<Text variant='questionText'>{question}</Text>
			</Card>
		</Box>
	);
}
