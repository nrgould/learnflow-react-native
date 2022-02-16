import React, { useState } from 'react';
import Box from '../components/atoms/Box';
import * as Haptics from 'expo-haptics';
import FeedItem from '../components/organisms/FeedItem';
import { useItemHeight } from '../hooks/useItemHeight';
import { StatusBar } from 'expo-status-bar';
import { NavigationTypes } from '../types';
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated';

export default function Feed({ navigation }: NavigationTypes) {
	const translateY = useSharedValue(0);
	const itemHeight = useItemHeight();

	const feedItems = new Array(4).fill(0);

	const scrollHandler = useAnimatedScrollHandler((event) => {
		// console.log(event.contentOffset.y);
		translateY.value = event.contentOffset.y;
	});

	return (
		<Box backgroundColor='background'>
			<StatusBar style={'light'} />
			<Animated.ScrollView
				onScroll={scrollHandler}
				snapToAlignment='center'
				scrollEventThrottle={16}
				onScrollEndDrag={() =>
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
				}
				decelerationRate='fast'
				snapToInterval={itemHeight}>
				{feedItems.map((num, idx) => {
					return (
						<FeedItem
							idx={idx}
							key={idx}
							translateY={translateY}
							navigation={navigation}
						/>
					);
				})}
			</Animated.ScrollView>
		</Box>
	);
}
