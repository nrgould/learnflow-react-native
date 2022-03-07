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
import { snapPoint } from 'react-native-redash';
import { ANSWER_BOX_HEIGHT, ANSWER_BOX_WIDTH } from '../../theme/layout';
import { Offset } from '../../types';
import {
	errorHaptic,
	mediumHaptic,
	successHaptic,
} from '../../util/hapticFeedback';
import Card from '../atoms/Card';
import Text from '../atoms/Text';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');
interface QuestionBoxProps {
	content: string;
	isAnswer: boolean;
	offsets: Offset[];
	index: number;
	position: {
		x: number;
		y: number;
	};
	boxLocation: {
		x: number;
		y: number;
	};
}

const AnimatedCard = Animated.createAnimatedComponent(Card);
const AnimatedText = Animated.createAnimatedComponent(Text);

const springDamping = 12;

export default function QuestionBox({
	content,
	isAnswer,
	position,
	boxLocation,
	index,
	offsets,
}: QuestionBoxProps) {
	const isGestureActive = useSharedValue(false);
	const translateX = useSharedValue(position.x);
	const translateY = useSharedValue(position.y);
	const offsetX = useSharedValue(0);
	const offsetY = useSharedValue(0);

	console.log(offsets[index].height.value);

	const CORRECT_TRANSLATION_Y_LOWER = -boxLocation.y + ANSWER_BOX_HEIGHT;
	// console.log(CORRECT_TRANSLATION_Y_LOWER);

	const panGestureEvent = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		{ x: number; y: number }
	>({
		onStart: (_, ctx) => {
			ctx.x = translateX.value;
			ctx.y = translateY.value;
			runOnJS(mediumHaptic)();
			isGestureActive.value = true;
		},
		onActive: ({ translationX, translationY }, ctx) => {
			translateX.value = ctx.x + translationX;
			translateY.value = ctx.y + translationY;

			console.log(translationY);
		},
		onEnd: ({ translationX, translationY, velocityX, velocityY }) => {
			const snapPointsX = [
				boxLocation.x,
				SCREEN_WIDTH - ANSWER_BOX_WIDTH,
			];
			const snapPointsY = [
				-boxLocation.y + ANSWER_BOX_HEIGHT + ANSWER_BOX_HEIGHT / 2,
				SCREEN_HEIGHT - ANSWER_BOX_HEIGHT,
			];

			const snapPointX = snapPoint(translationX, velocityX, snapPointsX);
			const snapPointY = snapPoint(translationY, velocityY, snapPointsY);

			if (translationY < CORRECT_TRANSLATION_Y_LOWER && isAnswer) {
				//correct answer, places into slot
				translateX.value = withSpring(snapPointX, {
					damping: springDamping,
					velocity: velocityX,
				});
				translateY.value = withSpring(snapPointY, {
					damping: springDamping,
					velocity: velocityY,
				});
				runOnJS(successHaptic)();
			} else {
				//returns to bank
				translateX.value = withSpring(position.x, {
					damping: springDamping,
				});
				translateY.value = withSpring(position.y, {
					damping: springDamping,
				});
				runOnJS(errorHaptic)();
			}
			isGestureActive.value = false;
		},
	});

	const rStyle = useAnimatedStyle(() => {
		return {
			zIndex: isGestureActive.value ? 100 : 0,
			position: 'absolute',
			top: 0,
			left: 0,
			transform: [
				{ translateX: translateX.value },
				{ translateY: translateY.value },
			],
		};
	});

	return (
		<PanGestureHandler onGestureEvent={panGestureEvent}>
			<AnimatedCard
				width={ANSWER_BOX_WIDTH}
				variant='questionBox'
				height={ANSWER_BOX_HEIGHT}
				alignItems='center'
				justifyContent='center'
				style={rStyle}>
				<AnimatedText variant='questionText'>{content}</AnimatedText>
			</AnimatedCard>
		</PanGestureHandler>
	);
}
