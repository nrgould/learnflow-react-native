import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Box from "../components/atoms/Box";
import FeedItem from "../components/organisms/FeedItem";
import { useItemHeight } from "../hooks/useItemHeight";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { FlatList, RefreshControl } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchFeedAsync } from "../store/feedSlice";
import Text from "../components/atoms/Text";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../theme/theme";
import { fetchCourseAsync } from "../store/actions/courseActions";
import Button from "../components/atoms/Button";
import { useNavigation } from "@react-navigation/native";

interface RenderItemProps {
  item: any;
  index: number;
}

const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

/**
 * Component that renders a list of posts meant to be
 * used for the feed screen.
 *
 * On start make fetch for posts then use a flatList
 * to display/control the posts.
 */
export default function Feed({ course = false }) {
  const [refreshing, setRefreshing] = useState(false);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const [prevVisibleIndex, setPrevVisibleIndex] = useState(-1);
  const [videoPaused, setVideoPaused] = useState(false);
  const [answered, setAnswered] = useState(false);
  const theme = useTheme<Theme>();
  const translateY = useSharedValue(0);
  const itemHeight = useItemHeight();
  const mediaRefs = useRef<any>([]);
  const dispatch = useAppDispatch();
  const feed = useAppSelector((state) => state.feed.feed);
  const status = useAppSelector((state) => state.feed.status);
  const { primary, background } = theme.colors;
  const userId = useAppSelector((state) => state.auth.userId);
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (course) {
      dispatch(fetchCourseAsync({ courseId: "i4wTZ9ioTEj7dte4O9Zb", userId }));
    } else {
      dispatch(fetchFeedAsync("i4wTZ9ioTEj7dte4O9Zb"));
    }
  }, [dispatch]);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  /**
   * handles refreshing the feed when the first element is pulled downwards
   */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  /**
   * determines whether the feed should be locked
   *
   * @returns {boolean} false if on question page and question hasn't been answered, true if on video page
   */
  const onLockFeed = useCallback(() => {
    return false;
  }, []);

  /**
   * determines whether the current viewable item is on a question,
   * and pauses the associated video accordingly
   */
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
    // itemVisiblePercentThreshold: 0,
  });

  /**
   * Called any time a new post is shown when a user scrolls
   * the FlatList, when this happens we should start playing
   * the post that is viewable and stop all the others
   *
   * Also sets the index to the current viewable item
   */
  const onViewableItemsChangedRef = useRef(({ viewableItems, changed }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentVisibleIndex(viewableItems[0].index);
    }
    changed.forEach((element: any) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  /**
   * renders the item shown in the FlatList
   *
   * @param {Object} item object of the post
   * @param {Integer} index position of the post in the FlatList
   * @returns
   */
  const renderItem = ({ item, index }: RenderItemProps) => {
    return (
      <FeedItem
        module={item}
        videoPaused={videoPaused}
        setVideoPaused={setVideoPaused}
        index={index}
        currentVisibleIndex={currentVisibleIndex}
        key={item.id}
        translateY={translateY}
      />
    );
  };

  /**
   * Memoized version of the render item to prevent uneccessary re-renders
   * only re-renders when currentVisibleIndex or videoPaused states have changed.
   */
  const memoizedRenderItem = useMemo(() => renderItem, [currentVisibleIndex, videoPaused]);

  if (status === "loading") {
    return (
      <Box flex={1} alignItems='center' justifyContent='center' backgroundColor='background'>
        <Text variant='subheader'>Loading...</Text>
      </Box>
    );
  }

  if (feed.length === 0) {
    return (
      <Box flex={1} alignItems='center' justifyContent='center' backgroundColor='background'>
        <Text variant='subheader'>No videos.</Text>
        <Button
          variant='primary'
          tall
          label='Find Courses'
          onPress={() => navigation.navigate("DiscoverStack")}
        />
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
        // scrollEnabled={currentVisibleIndex !== prevVisibleIndex}
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
