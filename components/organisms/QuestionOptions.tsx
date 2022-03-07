import React, { useState } from 'react';
import QuestionBox from '../molecules/QuestionBox';
import {
	ANSWER_BOX_HEIGHT,
	ANSWER_BOX_WIDTH,
	ANSWER_HEIGHT,
	CONTENT_WIDTH,
	MARGIN,
	OPTIONS_HEIGHT,
} from '../../theme/layout';
import Box from '../atoms/Box';
import Card from '../atoms/Card';
import Text from '../atoms/Text';
import { useSharedValue } from 'react-native-reanimated';

export interface Answer {
	content: string;
	isAnswer: boolean;
}

interface Props {
	answers: Answer[];
	question: string;
}

export default function QuestionOptions({ answers, question }: Props) {
	const [layoutReady, setLayoutReady] = useState(false);
	const [boxLocation, setBoxLocation] = useState({ x: 0, y: 0 });

	const offsets = answers.map(() => ({
		order: useSharedValue(-1),
		width: useSharedValue(0),
		height: useSharedValue(0),
		x: useSharedValue(0),
		y: useSharedValue(0),
		originalX: useSharedValue(0),
		originalY: useSharedValue(0),
	}));

	if (!layoutReady) {
		return (
			<Box
				flexDirection={'row'}
				flexWrap='wrap'
				justifyContent={'center'}>
				{answers.map(({ content }, index) => {
					return (
						<Card
							variant={'answerBox'}
							key={index}
							onLayout={({
								nativeEvent: {
									layout: { x, y, width, height },
								},
							}) => {
								const offset = offsets[index];
								offset.order.value = -1;
								offset.width.value = width;
								offset.height.value = height;
								offset.originalX.value = x;
								offset.originalY.value = y;
								if (index === answers.length - 1) {
									setLayoutReady(true);
								}
							}}>
							<Text>{content}</Text>
						</Card>
					);
				})}
			</Box>
		);
	}

	return (
		<>
			<Box
				height={ANSWER_HEIGHT}
				alignItems='center'
				padding='m'
				justifyContent='center'>
				<Card
					width={ANSWER_BOX_WIDTH}
					variant='answerBox'
					borderStyle='dashed'
					justifyContent='center'
					alignItems='center'
					height={ANSWER_BOX_HEIGHT}
					style={{
						position: 'absolute',
						bottom: 10,
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
				<Text variant='cardHeader'>{question}</Text>
			</Box>
			<Box
				height={OPTIONS_HEIGHT}
				flexDirection='row'
				justifyContent={'center'}
				flexWrap={'wrap'}>
				{answers.map((answer, index) => {
					let x =
						index < 2
							? index * ANSWER_BOX_WIDTH
							: (index - 2) * ANSWER_BOX_WIDTH;

					const y =
						index > 1 ? ANSWER_BOX_HEIGHT * 2 : ANSWER_BOX_HEIGHT;
					console.log(x, y);
					return (
						<QuestionBox
							boxLocation={boxLocation}
							key={index}
							index={index}
							isAnswer={answer.isAnswer}
							content={answer.content}
							offsets={offsets}
							position={{
								x,
								y,
							}}
						/>
					);
				})}
			</Box>
		</>
	);
}
