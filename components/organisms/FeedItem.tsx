import React from 'react';
import FeedItemQuestion from '../molecules/FeedItemQuestion';
import FeedItemContent from '../molecules/FeedItemContent';
import { NavigationTypes } from '../../types';
import Animated from 'react-native-reanimated';

interface Props extends NavigationTypes {
	idx: number;
	translateY: Animated.SharedValue<number>;
	answered: boolean;
	setAnswered: React.Dispatch<React.SetStateAction<boolean>>;
	allowScroll: boolean;
	setAllowScroll: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FeedItem({
	navigation,
	idx,
	translateY,
	answered,
	setAnswered,
	allowScroll,
	setAllowScroll,
}: Props) {
	return (
		<React.Fragment>
			<FeedItemContent navigation={navigation} />
			<FeedItemQuestion
				answered={answered}
				setAnswered={setAnswered}
				allowScroll={allowScroll}
				setAllowScroll={setAllowScroll}
				idx={idx}
				translateY={translateY}
			/>
		</React.Fragment>
	);
}
