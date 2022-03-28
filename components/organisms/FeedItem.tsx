import React, { useState } from 'react';
import FeedItemContent from '../molecules/FeedItemContent';
import { NavigationTypes, ParticleType } from '../../types';
import Animated from 'react-native-reanimated';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';

interface Props extends NavigationTypes {
	index: number;
	translateY?: Animated.SharedValue<number>;
	answered?: boolean;
	setAnswered?: React.Dispatch<React.SetStateAction<boolean>>;
	particle: ParticleType;
	currentVisibleIndex: number;
	videoPaused: boolean;
	setVideoPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FeedItem({
	navigation,
	index,
	particle,
	currentVisibleIndex,
	videoPaused,
	setVideoPaused,
}: Props) {
	const [liked, setLiked] = useState(false);

	const { text, options } = particle.question;

	return (
		<React.Fragment>
			<FeedItemContent
				videoPaused={videoPaused}
				setVideoPaused={setVideoPaused}
				liked={liked}
				setLiked={setLiked}
				navigation={navigation}
				currentVisibleIndex={currentVisibleIndex}
				index={index}
			/>
			<MultipleChoiceQuestion options={options} question={text} />
		</React.Fragment>
	);
}
