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
	const [answered, setAnswered] = useState(false);
	const [allowScroll, setAllowScroll] = useState(true);
	const translateY = useSharedValue(0);
	const itemHeight = useItemHeight();

	console.log(allowScroll);

	const feedItems = new Array(4).fill(0);

	const scrollHandler = useAnimatedScrollHandler((event) => {
		translateY.value = event.contentOffset.y;
		// console.log(event);
		// if scrolling is disabled and scroll begins => error haptic && message saying "need to answer question first"
	});

	return (
		<Box backgroundColor='background'>
			<StatusBar style={'light'} />
			<Animated.ScrollView
				onScroll={scrollHandler}
				snapToAlignment='center'
				pagingEnabled
				scrollEnabled={allowScroll}
				scrollEventThrottle={16}
				onScrollEndDrag={() =>
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
				}
				decelerationRate='fast'
				snapToInterval={itemHeight}>
				{feedItems.map((_, idx) => {
					return (
						<FeedItem
							idx={idx}
							key={idx}
							translateY={translateY}
							navigation={navigation}
							answered={answered}
							setAnswered={setAnswered}
							allowScroll={allowScroll}
							setAllowScroll={setAllowScroll}
						/>
					);
				})}
			</Animated.ScrollView>
		</Box>
	);
}
