import React, { useState } from 'react';
import FeedItemContent from '../molecules/FeedItemContent';
import { ModuleType } from '../../types';
import Animated from 'react-native-reanimated';
import MultipleChoiceQuestion from './questions/MultipleChoiceQuestion';
import { View } from 'react-native';

interface Props {
	index: number;
	translateY?: Animated.SharedValue<number>;
	answered?: boolean;
	setAnswered?: React.Dispatch<React.SetStateAction<boolean>>;
	module: ModuleType;
	currentVisibleIndex: number;
	videoPaused: boolean;
	setVideoPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FeedItem({
	index,
	module,
	currentVisibleIndex,
	videoPaused,
	setVideoPaused,
}: Props) {
	const [liked, setLiked] = useState(false);

	const { question_text, question_options } = module.question;

	return (
		<React.Fragment>
			<FeedItemContent
				videoPaused={videoPaused}
				setVideoPaused={setVideoPaused}
				liked={liked}
				setLiked={setLiked}
				currentVisibleIndex={currentVisibleIndex}
				index={index}
			/>
			<MultipleChoiceQuestion
				options={question_options}
				question={question_text}
			/>
		</React.Fragment>
	);
}
