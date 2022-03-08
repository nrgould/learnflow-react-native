import React from 'react';
import FeedItemQuestion from '../molecules/FeedItemQuestion';
import FeedItemContent from '../molecules/FeedItemContent';
import { NavigationTypes, ParticleType } from '../../types';
import Animated from 'react-native-reanimated';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import { useItemHeight } from '../../hooks/useItemHeight';

interface Props extends NavigationTypes {
	index: number;
	translateY: Animated.SharedValue<number>;
	answered?: boolean;
	setAnswered?: React.Dispatch<React.SetStateAction<boolean>>;
	allowScroll: boolean;
	setAllowScroll: React.Dispatch<React.SetStateAction<boolean>>;
	particle: ParticleType;
}

export default function FeedItem({
	navigation,
	index,
	translateY,
	allowScroll,
	setAllowScroll,
	particle,
}: Props) {
	const itemHeight = useItemHeight();

	const onLockScroll = () => {
		const offset = index * itemHeight * 2;

		if (translateY.value === offset) {
			setAllowScroll(false);
		}
	};

	return (
		<React.Fragment>
			<FeedItemContent navigation={navigation} />
			<MultipleChoiceQuestion question={particle.question} />
			{/* <FeedItemQuestion
				answered={answered}
				setAnswered={setAnswered}
				allowScroll={allowScroll}
				setAllowScroll={setAllowScroll}
				idx={idx}
				translateY={translateY}
			/> */}
		</React.Fragment>
	);
}
