import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchFeedAsync } from '../store/feedSlice';
import Text from '../components/atoms/Text';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme/theme';

interface RenderItemProps {
	item: any;
	index: number;
}

const wait = (timeout: any) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function Feed({ navigation }: NavigationTypes) {
	const [refreshing, setRefreshing] = useState(false);
	const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
	const theme = useTheme<Theme>();
	const translateY = useSharedValue(0);
	const itemHeight = useItemHeight();

	const dispatch = useAppDispatch();
	const { feed } = useAppSelector((state) => state.feed);
	const status = useAppSelector((state) => state.feed.status);

	useEffect(() => {
		dispatch(fetchFeedAsync());
	}, [dispatch]);

	console.log('refreshing:', refreshing);

	const { primary, background } = theme.colors;

	const scrollHandler = useAnimatedScrollHandler((event) => {
		translateY.value = event.contentOffset.y;
	});

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	const viewConfigRef = useRef({
		viewAreaCoveragePercentThreshold: 90,
	});

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
			/>
		);
	};

	const memoizedRenderItem = useMemo(() => renderItem, [currentVisibleIndex]);

	if (status === 'loading') {
		return (
			<Box
				flex={1}
				alignItems='center'
				justifyContent='center'
				backgroundColor='background'>
				<Text variant='header'>Loading...</Text>
			</Box>
		);
	}

	return (
		<Box backgroundColor='background'>
			<StatusBar style={'light'} />
			<AnimatedFlatList
				data={feed}
				initialNumToRender={3}
				maxToRenderPerBatch={3}
				windowSize={5}
				removeClippedSubviews={true}
				onViewableItemsChanged={onViewableItemsChangedRef.current}
				snapToInterval={itemHeight}
				renderItem={memoizedRenderItem}
				onScroll={scrollHandler}
				snapToAlignment='center'
				pagingEnabled={true}
				scrollEventThrottle={16}
				onScrollEndDrag={mediumHaptic}
				decelerationRate='fast'
				viewabilityConfig={viewConfigRef.current}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor={primary}
						progressBackgroundColor={background}
					/>
				}
			/>
		</Box>
	);
}
