import React, { useState } from 'react';
import FeedItemContent from '../molecules/FeedItemContent';
import { ParticleType } from '../../types';
import Animated from 'react-native-reanimated';
import MultipleChoiceQuestion from './questions/MultipleChoiceQuestion';
import { View } from 'react-native';

interface Props {
	index: number;
	translateY?: Animated.SharedValue<number>;
	answered?: boolean;
	setAnswered?: React.Dispatch<React.SetStateAction<boolean>>;
	particle: ParticleType;
	currentVisibleIndex: number;
	videoPaused: boolean;
	setVideoPaused: React.Dispatch<React.SetStateAction<boolean>>;
	ref: any;
}

export default function FeedItem({
	index,
	particle,
	currentVisibleIndex,
	videoPaused,
	setVideoPaused,
	ref,
}: Props) {
	const [liked, setLiked] = useState(false);

	const { text, options } = particle.question;

	return (
		<React.Fragment>
			<FeedItemContent
				parentRef={ref}
				videoPaused={videoPaused}
				setVideoPaused={setVideoPaused}
				liked={liked}
				setLiked={setLiked}
				currentVisibleIndex={currentVisibleIndex}
				index={index}
			/>
			<MultipleChoiceQuestion options={options} question={text} />
		</React.Fragment>
	);
}
