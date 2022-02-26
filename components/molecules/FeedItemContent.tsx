import React, { useCallback, useRef, useState } from 'react';
import Box from '../atoms/Box';
import Button from '../atoms/Button';
import * as Haptics from 'expo-haptics';
import { useItemHeight } from '../../hooks/useItemHeight';
import { Video } from 'expo-av';
import Slider from '@react-native-community/slider';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/theme';
import { NavigationTypes } from '../../types';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { Dimensions, Image } from 'react-native';

interface Props extends NavigationTypes {
	videoURL?: any;
}

const { width } = Dimensions.get('window');

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function FeedItemContent({
	videoURL = require('../../assets/video/sampleTikTok.mov'),
}: Props) {
	const height = useItemHeight();
	const video = useRef<any>(null);
	const [videoPos, setVideoPos] = useState<number>(0);
	const [status, setStatus] = React.useState<any>({});

	const theme = useTheme<Theme>();
	const { primary, primaryText, border } = theme.colors;

	const scale = useSharedValue(0);

	const rStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: Math.max(scale.value, 0) }],
		};
	});

	function handlePlay() {
		video.current.playAsync();
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	}

	function handlePause() {
		video.current.pauseAsync();
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	}

	const onDoubleTap = useCallback(() => {
		console.log('DOUBLE TAP');
		scale.value = withSpring(1, undefined, (isFinished) => {
			if (isFinished) {
				scale.value = withDelay(500, withSpring(0));
			}
		});
	}, []);

	return (
		<TapGestureHandler numberOfTaps={2} onActivated={onDoubleTap}>
			<Box
				alignItems='center'
				justifyContent='center'
				height={height}
				width='100%'>
				<Animated.View>
					<AnimatedImage
						source={require('../../assets/heart.png')}
						style={[
							{
								shadowOffset: { width: 0, height: 20 },
								shadowOpacity: 0.2,
								shadowRadius: 35,
								width: width,
								height: width,
								position: 'absolute',
								zIndex: 100,
								top: 0,
								bottom: 0,
								left: 0,
								right: 0,
							},
							rStyle,
						]}
						resizeMode='center'
					/>
				</Animated.View>
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
				/>
				<Box
					flexDirection='column'
					alignItems='center'
					justifyContent='center'
					position='absolute'
					bottom={0}
					marginBottom='s'
					marginHorizontal='m'
					width='100%'>
					<Box flexDirection='row'>
						<Button
							label={status.isPlaying ? 'Pause' : 'Play'}
							variant={status.isPlaying ? 'error' : 'success'}
							onPress={
								status.isPlaying ? handlePause : handlePlay
							}
							marginHorizontal='s'
						/>
					</Box>
					<Slider
						style={{ width: '100%' }}
						minimumValue={0}
						maximumValue={status.durationMillis}
						value={status.positionMillis}
						onValueChange={setVideoPos}
						maximumTrackTintColor={border}
						minimumTrackTintColor={primary}
						thumbTintColor={primaryText}
						step={200}
					/>
				</Box>
			</Box>
		</TapGestureHandler>
	);
}

// const styles = StyleSheet.create({
// 	image: {
// 		width:
// 	}
// })
