import React, { useState } from 'react';
import Box from '../components/atoms/Box';
import FeedItem from '../components/organisms/FeedItem';
import { useItemHeight } from '../hooks/useItemHeight';
import { StatusBar } from 'expo-status-bar';
import { NavigationTypes } from '../types';
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated';
import { mediumHaptic } from '../util/hapticFeedback';
import { FlatList, RefreshControl } from 'react-native';
import { serializedParticles } from '../data/dummy-data';

interface RenderItemProps {
	item: any;
	index: number;
}

const wait = (timeout: any) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function Feed({ navigation }: NavigationTypes) {
	const [answered, setAnswered] = useState(false);
	const [allowScroll, setAllowScroll] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const translateY = useSharedValue(0);
	// const index = useSharedValue(0);
	const itemHeight = useItemHeight();

	console.log(refreshing);

	const scrollHandler = useAnimatedScrollHandler((event) => {
		translateY.value = event.contentOffset.y;
		// if scrolling is disabled and scroll begins => error haptic && message saying "need to answer question first"
	});

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	const renderItem = ({ item, index }: RenderItemProps) => {
		return (
			<FeedItem
				particle={item}
				index={index}
				key={item.id}
				translateY={translateY}
				navigation={navigation}
				allowScroll={allowScroll}
				setAllowScroll={setAllowScroll}
			/>
		);
	};

	return (
		<Box backgroundColor='background'>
			<StatusBar style={'light'} />
			<AnimatedFlatList
				data={serializedParticles}
				snapToInterval={itemHeight}
				renderItem={renderItem}
				onScroll={scrollHandler}
				snapToAlignment='center'
				pagingEnabled
				scrollEnabled={allowScroll}
				scrollEventThrottle={16}
				onScrollEndDrag={mediumHaptic}
				decelerationRate='fast'
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			/>
		</Box>
	);
}
