import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// const HEADER_HEIGHT = 200;
const COLLAPSED_HEADER_HEIGHT = 80;

interface Props {
	translateY: Animated.SharedValue<number>;
	title: string;
}

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
		// const animHeight = interpolate(
		// 	translateY.value,
		// 	[0, 100],
		// 	[0, COLLAPSED_HEADER_HEIGHT],
		// 	Extrapolate.CLAMP
		// );
		return {
			opacity,
		};
	});
	return (
		<Animated.View style={[styles.header, rHeaderStyle]}>
			<Animated.Text style={[styles.headerTitle, rTextStyle]}>
				{title}
			</Animated.Text>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	title: {
		marginTop: COLLAPSED_HEADER_HEIGHT,
		fontSize: 40,
		color: '#000',
		width: '90%',
	},
	header: {
		backgroundColor: 'white',
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
	headerTitle: {
		color: '#000',
		fontWeight: '700',
		marginBottom: 10,
		zIndex: 5,
		fontSize: 22,
	},
});
