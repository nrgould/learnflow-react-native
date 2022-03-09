import React, { useRef, useState } from 'react';
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
	const [allowScroll, setAllowScroll] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
	const translateY = useSharedValue(0);
	const itemHeight = useItemHeight();

	console.log('refreshing:', refreshing);

	const viewConfigRef = useRef({
		viewAreaCoveragePercentThreshold: 90,
	});

	const scrollHandler = useAnimatedScrollHandler((event) => {
		translateY.value = event.contentOffset.y;
	});

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	const onViewableItemsChangedRef = useRef(({ viewableItems }: any) => {
		if (viewableItems && viewableItems.length > 0) {
			setCurrentVisibleIndex(viewableItems[0].index);
		}
	});

	const renderItem = ({ item, index }: RenderItemProps) => {
		return (
			<FeedItem
				particle={item}
				index={index}
				currentVisibleIndex={currentVisibleIndex}
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
				initialNumToRender={3}
				maxToRenderPerBatch={3}
				windowSize={5}
				removeClippedSubviews={true}
				onViewableItemsChanged={onViewableItemsChangedRef.current}
				snapToInterval={itemHeight}
				renderItem={renderItem}
				onScroll={scrollHandler}
				snapToAlignment='center'
				pagingEnabled={true}
				scrollEnabled={allowScroll}
				scrollEventThrottle={16}
				onScrollEndDrag={mediumHaptic}
				decelerationRate='fast'
				viewabilityConfig={viewConfigRef.current}
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
