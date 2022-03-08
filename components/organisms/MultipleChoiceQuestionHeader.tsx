import React from 'react';
import { ANSWER_HEIGHT } from '../../theme/layout';
import Box from '../atoms/Box';
import Card from '../atoms/Card';
import Text from '../atoms/Text';

interface Props {
	question: string;
	attempts: number;
	statusMessage: string;
	statusColor: string;
}

export default function MultipleChoiceQuestionHeader({
	question,
	attempts,
	statusMessage,
	statusColor,
}: Props) {
	return (
		<Box
			height={ANSWER_HEIGHT}
			alignItems='flex-start'
			justifyContent={'center'}>
			<Box
				flexDirection='row'
				marginBottom='m'
				alignItems='center'
				width='100%'
				justifyContent='space-between'>
				<Text
					variant='subheader'
					fontFamily='poppins-semibold'
					color='secondary'>
					Practice
				</Text>
				<Text
					variant='subheader'
					fontFamily='poppins-semibold'
					color={attempts === 1 ? 'warning' : 'primaryText'}>
					{attempts} {attempts > 1 ? 'attempts' : 'attempt'} left
				</Text>
			</Box>
			<Card
				variant='answerBox'
				borderStyle='dashed'
				alignItems='center'
				justifyContent='center'
				padding='m'
				width='100%'>
				<Text variant='questionText' fontSize={24}>
					{question}
				</Text>
			</Card>
			<Box
				justifyContent='center'
				alignItems='center'
				width='100%'
				height={60}>
				<Text
					marginTop={'l'}
					style={{ color: statusColor }}
					fontFamily='poppins-semibold'
					variant='subheader'>
					{statusMessage}
				</Text>
			</Box>
		</Box>
	);
}
