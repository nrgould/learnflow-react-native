import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import Box from '../components/atoms/Box';
import FeedItem from '../components/organisms/FeedItem';
import { useItemHeight } from '../hooks/useItemHeight';
import { NavigationTypes } from '../types';
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated';
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
	const [prevVisibleIndex, setPrevVisibleIndex] = useState(0);
	const [videoPaused, setVideoPaused] = useState(false);
	const theme = useTheme<Theme>();
	const translateY = useSharedValue(0);
	const itemHeight = useItemHeight();
	const mediaRefs = useRef<any>([]);
	const dispatch = useAppDispatch();
	const { feed } = useAppSelector((state) => state.feed);
	const status = useAppSelector((state) => state.feed.status);
	const { primary, background } = theme.colors;

	useEffect(() => {
		dispatch(fetchFeedAsync());
	}, [dispatch]);

	// console.log('paused: ', videoPaused);
	// console.log('index: ', currentVisibleIndex);
	// console.log('prev index: ', prevVisibleIndex);

	const scrollHandler = useAnimatedScrollHandler((event) => {
		translateY.value = event.contentOffset.y;
	});

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	const shouldPlay = useCallback(() => {
		const isQuestion = prevVisibleIndex === currentVisibleIndex;
		if (isQuestion) {
			setVideoPaused(true);
		} else {
			setVideoPaused(false);
		}
		setPrevVisibleIndex(currentVisibleIndex);
	}, [currentVisibleIndex, prevVisibleIndex]);

	const viewConfigRef = useRef({
		viewAreaCoveragePercentThreshold: 90,
	});

	const onViewableItemsChangedRef = useRef(
		({ viewableItems, changed }: any) => {
			console.log(changed);
			if (viewableItems && viewableItems.length > 0) {
				setCurrentVisibleIndex(viewableItems[0].index);
			}
		}
	);

	const renderItem = ({ item, index }: RenderItemProps) => {
		return (
			<FeedItem
				particle={item}
				videoPaused={videoPaused}
				setVideoPaused={setVideoPaused}
				index={index}
				currentVisibleIndex={currentVisibleIndex}
				key={item.id}
				translateY={translateY}
				ref={(PostSingleRef: any) =>
					(mediaRefs.current[item.id] = PostSingleRef)
				}
			/>
		);
	};

	const memoizedRenderItem = useMemo(
		() => renderItem,
		[currentVisibleIndex, videoPaused]
	);

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
				initialNumToRender={0}
				maxToRenderPerBatch={2}
				windowSize={4} //set back to 5
				showsVerticalScrollIndicator={false}
				removeClippedSubviews={true}
				onScrollBeginDrag={() => setVideoPaused(true)}
				onMomentumScrollEnd={shouldPlay}
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
