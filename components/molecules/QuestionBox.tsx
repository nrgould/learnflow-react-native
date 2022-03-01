import React from 'react';
import { Dimensions } from 'react-native';
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { errorHaptic, mediumHaptic, successHaptic } from '../../util';
import Card from '../atoms/Card';
import Text from '../atoms/Text';

interface QuestionBoxProps {
	content: string;
	isAnswer?: boolean;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AnimatedCard = Animated.createAnimatedComponent(Card);
const AnimatedText = Animated.createAnimatedComponent(Text);

export default function QuestionBox({ content, isAnswer }: QuestionBoxProps) {
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const panGestureEvent =
		useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
			onStart: (event) => {
				runOnJS(mediumHaptic)();
			},
			onActive: (event) => {
				console.log(event.translationY, -SCREEN_HEIGHT * 0.15);
				translateX.value = event.translationX;
				translateY.value = event.translationY;
			},
			onEnd: (event) => {
				console.log(event.translationY);
				if (event.translationY < -SCREEN_HEIGHT * 0.15 && isAnswer) {
					translateX.value = withSpring(70);
					translateY.value = withSpring(-165);
					runOnJS(successHaptic)();
				} else {
					translateX.value = withSpring(0);
					translateY.value = withSpring(0);
					runOnJS(errorHaptic)();
				}
			},
		});

	const rStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: translateX.value },
				{ translateY: translateY.value },
			],
		};
	});

	return (
		<PanGestureHandler onGestureEvent={panGestureEvent}>
			<AnimatedCard
				width={SCREEN_WIDTH / 3.5}
				variant='questionBox'
				height={60}
				alignItems='center'
				justifyContent='center'
				onLayout={({ nativeEvent }) => {
					console.log(nativeEvent);
				}}
				style={[rStyle]}>
				<AnimatedText variant='questionText'>{content}</AnimatedText>
			</AnimatedCard>
		</PanGestureHandler>
	);
}
