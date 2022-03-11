import React, { useCallback, useRef, useState } from 'react';
import Box from '../atoms/Box';
import { useItemHeight } from '../../hooks/useItemHeight';
import { Video } from 'expo-av';
import Slider from '@react-native-community/slider';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/theme';
import { NavigationTypes } from '../../types';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSpring,
} from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lightHaptic } from '../../util/hapticFeedback';
import Text from '../atoms/Text';
import Icon from '../atoms/Icon';
import { useVector } from 'react-native-redash';

interface Props extends NavigationTypes {
	videoURL?: any;
	liked: boolean;
	setLiked: React.Dispatch<React.SetStateAction<boolean>>;
	currentVisibleIndex: number;
	index: number;
}

const { width } = Dimensions.get('window');
const iconSize = 42;

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export default function FeedItemContent({
	liked,
	setLiked,
	videoURL = require('../../assets/video/sampleTikTok.mov'),
	currentVisibleIndex,
	index,
}: Props) {
	const height = useItemHeight();
	const video = useRef<any>(null);
	const [videoPos, setVideoPos] = useState<number>(0);
	const [status, setStatus] = React.useState<any>({});
	const theme = useTheme<Theme>();
	const { whiteBtn, error } = theme.colors;
	const position = useVector();

	const scale = useSharedValue(0);
	const iconScale = useSharedValue(1);

	const progressInc = width / status.durationMillis;
	const progressWidth = Math.floor(status.positionMillis * progressInc);

	const tapStyle = useAnimatedStyle(() => {
		return {
			top: position.y.value - iconSize / 2,
			left: position.x.value - iconSize / 2,
			transform: [{ scale: Math.max(scale.value, 0) }],
		};
	});

	const iconStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: Math.max(iconScale.value, 1) }],
		};
	});

	const onLiked = useCallback(() => {
		if (liked) {
			setLiked(false);
		} else if (!liked) {
			setLiked(true);
			iconScale.value = withSpring(1.2, { damping: 5 }, (isFinished) => {
				if (isFinished) {
					iconScale.value = withSpring(1);
				}
			});
		}

		lightHaptic();
	}, [liked]);

	function handlePlay() {
		video.current.playAsync();
	}

	function handlePause() {
		video.current.pauseAsync();
	}

	const doubleTap = Gesture.Tap()
		.numberOfTaps(2)
		.onEnd(() => {
			runOnJS(setLiked)(true);
			iconScale.value = withSpring(1, { damping: 5 }, (isFinished) => {
				if (isFinished) {
					iconScale.value = withDelay(100, withSpring(0));
				}
			});
		});

	const singleTap = Gesture.Tap().onEnd((event) => {
		runOnJS(lightHaptic)();
		if (status.isPlaying) {
			runOnJS(handlePause)();
		} else {
			runOnJS(handlePlay)();
		}

		position.x.value = event.x;
		position.y.value = event.y;

		scale.value = withSpring(1, { damping: 7 }, (isFinished) => {
			if (isFinished) {
				scale.value = withSpring(0);
			}
		});
	});

	const taps = Gesture.Exclusive(doubleTap, singleTap);

	return (
		<Box
			alignItems='center'
			justifyContent='center'
			height={height}
			width='100%'>
			<Box
				width={width}
				height={100}
				position='absolute'
				style={{ top: 0, left: 0 }}
				backgroundColor='background'>
				<Text>header</Text>
			</Box>
			<GestureDetector gesture={taps}>
				<Video
					ref={video}
					source={videoURL}
					style={{ height: height, width: '100%' }}
					resizeMode='cover'
					isLooping
					positionMillis={videoPos}
					isMuted={false}
					useNativeControls={false}
					onPlaybackStatusUpdate={setStatus}
					progressUpdateIntervalMillis={200}
					volume={10}
					shouldPlay={index === currentVisibleIndex}
				/>
			</GestureDetector>
			<Box
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
				position='absolute'
				bottom={0}
				zIndex={100}
				marginBottom='s'
				marginHorizontal='m'
				width='100%'>
				<Box
					flexDirection='column'
					alignItems='center'
					justifyContent='center'
					position='absolute'
					right={20}
					bottom={100}>
					<AnimatedIcon
						size={42}
						name={liked ? 'heart' : 'heart-outline'}
						color={liked ? error : whiteBtn}
						style={[iconStyle, { marginBottom: 15 }]}
						onPress={onLiked}
					/>
					<Icon
						size={32}
						name='arrow-redo'
						color={whiteBtn}
						style={{ marginBottom: 15 }}
					/>
					<Icon
						size={32}
						name='ellipsis-horizontal'
						color={whiteBtn}
						style={{ marginBottom: 20 }}
					/>
				</Box>
				<Box
					width='100%'
					position='absolute'
					bottom={-10}
					left={0}
					height={10}
					backgroundColor='background'
				/>
				<Box
					width={status.positionMillis ? progressWidth : 0}
					position='absolute'
					bottom={-10}
					left={0}
					height={10}
					backgroundColor='primary'
				/>
				{/* <Slider
					style={{ width: '100%' }}
					minimumValue={0}
					maximumValue={status.durationMillis}
					value={status.positionMillis}
					onValueChange={setVideoPos}
					maximumTrackTintColor={border}
					minimumTrackTintColor={primary}
					thumbTintColor={whiteBtn}
					step={200}
				/> */}
			</Box>
			<AnimatedIcon
				size={42}
				name={status.isPlaying ? 'play' : 'pause'}
				color={whiteBtn}
				style={[tapStyle, { zIndex: 100, position: 'absolute' }]}
			/>
		</Box>
	);
}
