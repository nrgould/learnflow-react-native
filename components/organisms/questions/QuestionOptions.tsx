import React, { useState } from 'react';
import QuestionBox from '../../molecules/QuestionBox';
import {
	ANSWER_BOX_HEIGHT,
	ANSWER_BOX_WIDTH,
	ANSWER_HEIGHT,
	CONTENT_WIDTH,
	MARGIN,
	OPTIONS_HEIGHT,
	SCREEN_HEIGHT,
} from '../../../theme/layout';
import Box from '../../atoms/Box';
import Card from '../../atoms/Card';
import Text from '../../atoms/Text';

export interface Answer {
	content: string;
	isAnswer: boolean;
}

interface Props {
	answers: Answer[];
	question: string;
}

export default function QuestionOptions({ answers, question }: Props) {
	const [boxLocation, setBoxLocation] = useState({ x: 0, y: 0 });

	return (
		<Box
			height={'100%'}
			alignItems='center'
			padding='m'
			position={'relative'}
			justifyContent='center'>
			<Text variant='cardHeader'>{question}</Text>
			<Card
				width={ANSWER_BOX_WIDTH}
				variant='answerBox'
				borderStyle='dashed'
				justifyContent='center'
				alignItems='center'
				height={ANSWER_BOX_HEIGHT}
				style={{
					position: 'absolute',
					top: 100,
					left: '50%',
					transform: [{ translateX: -ANSWER_BOX_WIDTH / 3 }],
				}}
				onLayout={({
					nativeEvent: {
						layout: { x, y },
					},
				}) => {
					setBoxLocation({ x, y });
				}}>
				<Text variant='body' color='border' fontSize={12}>
					Place here
				</Text>
			</Card>
			{answers.map((answer, index) => {
				const x =
					index < 2 // either 0 or 1
						? index * ANSWER_BOX_WIDTH + MARGIN * index
						: (index - 2) * ANSWER_BOX_WIDTH + MARGIN * (index - 2);

				const y =
					index > 1 // 2 to 3
						? ANSWER_BOX_HEIGHT * 2 + MARGIN * 2
						: ANSWER_BOX_HEIGHT + MARGIN;
				return (
					<QuestionBox
						boxLocation={boxLocation}
						key={index}
						index={index}
						isAnswer={answer.isAnswer}
						content={answer.content}
						position={{
							x,
							y,
						}}
					/>
				);
			})}
		</Box>
	);
}
