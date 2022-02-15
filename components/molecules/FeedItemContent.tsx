import React, { useRef, useState } from 'react';
import Box from '../atoms/Box';
import Button from '../atoms/Button';
import * as Haptics from 'expo-haptics';
import { useItemHeight } from '../../hooks/useItemHeight';
import { Video } from 'expo-av';
import Slider from '@react-native-community/slider';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/theme';
import { NavigationTypes } from '../../types';

export default function FeedItemContent({ navigation }: NavigationTypes) {
	const height = useItemHeight();
	const video = useRef<any>(null);
	const [videoPos, setVideoPos] = useState<number>(0);
	const [status, setStatus] = React.useState<any>({});
	const theme = useTheme<Theme>();

	const { primary, primaryText, border } = theme.colors;

	function handlePlay() {
		video.current.playAsync();
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	}

	function handlePause() {
		video.current.pauseAsync();
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	}

	console.log(status);
	return (
		<Box
			alignItems='center'
			justifyContent='center'
			height={height}
			width='100%'>
			<Video
				ref={video}
				source={require('../../assets/video/sampleTikTok.mov')}
				style={{ height: height, width: '100%' }}
				resizeMode='cover'
				isLooping
				positionMillis={videoPos}
				isMuted={false}
				useNativeControls={false}
				onPlaybackStatusUpdate={setStatus}
				progressUpdateIntervalMillis={200}
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
						onPress={status.isPlaying ? handlePause : handlePlay}
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
	);
}

// const styles = StyleSheet.create({
// 	image: {
// 		width:
// 	}
// })
