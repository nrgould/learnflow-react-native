import React, { useEffect, useMemo, useRef, useState } from 'react';
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated';
import { FlatList, RefreshControl } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/theme';
import { useItemHeight } from '../../hooks/useItemHeight';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchFeedAsync } from '../../store/feedSlice';
import FeedItem from '../../components/organisms/FeedItem';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import { useNavigation } from '@react-navigation/native';

interface RenderItemProps {
	item: any;
	index: number;
}

const wait = (timeout: any) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function ModuleFeed() {
	const [refreshing, setRefreshing] = useState(false);
	const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
	const [videoPaused, setVideoPaused] = useState(false);
	const theme = useTheme<Theme>();
	const translateY = useSharedValue(0);
	const itemHeight = useItemHeight();
	const dispatch = useAppDispatch();
	const { feed } = useAppSelector((state) => state.feed);
	const status = useAppSelector((state) => state.feed.status);
	const navigation = useNavigation<any>();

	useEffect(() => {
		dispatch(fetchFeedAsync());
	}, [dispatch]);

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
				videoPaused={videoPaused}
				setVideoPaused={setVideoPaused}
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
				<Text variant='subheader'>Loading...</Text>
			</Box>
		);
	}

	return (
		<Box backgroundColor='background'>
			<AnimatedFlatList
				data={feed}
				initialNumToRender={3}
				maxToRenderPerBatch={2}
				windowSize={5}
				showsVerticalScrollIndicator={false}
				removeClippedSubviews={true}
				onViewableItemsChanged={onViewableItemsChangedRef.current}
				snapToInterval={itemHeight}
				renderItem={memoizedRenderItem}
				onScroll={scrollHandler}
				snapToAlignment='center'
				pagingEnabled={true}
				scrollEventThrottle={16}
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
