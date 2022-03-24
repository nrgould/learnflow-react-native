import { Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
} from 'react-native-reanimated';
import Text from '../atoms/Text';
import Box from '../atoms/Box';

const { width, height } = Dimensions.get('window');

const isSmallDevice = height < 700;

const COLLAPSED_HEADER_HEIGHT = isSmallDevice ? 60 : 80;

interface Props {
	translateY: Animated.SharedValue<number>;
	title: string;
}

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function AnimatedScrollHeader({ translateY, title }: Props) {
	const rTextStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			translateY.value,
			[75, 100],
			[0, 1],
			Extrapolate.CLAMP
		);
		return {
			opacity,
		};
	});

	const rHeaderStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			translateY.value,
			[50, 60],
			[0, 1],
			Extrapolate.CLAMP
		);
		return {
			opacity,
		};
	});
	return (
		<AnimatedBox
			backgroundColor='bottomTabBackground'
			style={[styles.header, rHeaderStyle]}>
			<AnimatedText
				variant='headerTitle'
				fontFamily='poppins-medium'
				style={[rTextStyle]}>
				{title}
			</AnimatedText>
		</AnimatedBox>
	);
}

const styles = StyleSheet.create({
	title: {
		marginTop: COLLAPSED_HEADER_HEIGHT,
		fontSize: 40,
		width: '90%',
	},
	header: {
		height: COLLAPSED_HEADER_HEIGHT,
		width: width,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'flex-end',
		zIndex: 5,
	},
});
