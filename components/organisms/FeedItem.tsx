import React from 'react';
import FeedItemQuestion from '../molecules/FeedItemQuestion';
import FeedItemContent from '../molecules/FeedItemContent';
import { NavigationTypes } from '../../types';
import Animated from 'react-native-reanimated';

interface Props extends NavigationTypes {
	idx: number;
	translateY: Animated.SharedValue<number>;
}

export default function FeedItem({ navigation, idx, translateY }: Props) {
	console.log(translateY.value);
	return (
		<React.Fragment>
			<FeedItemContent navigation={navigation} />
			<FeedItemQuestion idx={idx} translateY={translateY} />
		</React.Fragment>
	);
}
