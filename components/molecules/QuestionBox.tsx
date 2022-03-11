import React from 'react';
import { Dimensions } from 'react-native';
import {
	Gesture,
	GestureDetector,
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
import { snapPoint, useVector } from 'react-native-redash';
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
}: QuestionBoxProps) {
	const isGestureActive = useSharedValue(false);
	const translateX = useSharedValue(index * ANSWER_BOX_WIDTH);
	const translateY = useSharedValue(5 * ANSWER_BOX_HEIGHT);
	const pos = useVector();
	const context = useVector();

	const CORRECT_TRANSLATION_Y_LOWER = -boxLocation.y + ANSWER_BOX_HEIGHT;

	const SNAP_POINT_X = boxLocation.x - ANSWER_BOX_WIDTH / 3;
	const SNAP_POINT_Y =
		-boxLocation.y + ANSWER_BOX_HEIGHT + SCREEN_HEIGHT / 58;
	const snapPointsX = [SNAP_POINT_X, SCREEN_WIDTH - ANSWER_BOX_WIDTH];
	const snapPointsY = [SNAP_POINT_Y, SCREEN_HEIGHT - ANSWER_BOX_HEIGHT];

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
		onActive: ({ translationX, translationY, ...event }, ctx) => {
			console.log(event);
			console.log(boxLocation);
			pos.x.value = ctx.x + event.absoluteX;
			pos.y.value = ctx.y + event.absoluteY;
			translateX.value = ctx.x + translationX;
			translateY.value = ctx.y + translationY;
		},
		onEnd: ({ translationX, translationY, velocityX, velocityY }) => {
			if (translationY < CORRECT_TRANSLATION_Y_LOWER && isAnswer) {
				const snapPointX = snapPoint(
					translationX,
					velocityX,
					snapPointsX
				);
				const snapPointY = snapPoint(
					translationY,
					velocityY,
					snapPointsY
				);
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

	const pan = Gesture.Pan()
		.onStart(() => {
			context.x.value = translateX.value;
			context.y.value = translateY.value;
		})
		.onUpdate((event) => {
			// console.log(event);
			translateX.value = context.x.value + event.translationX;
			translateY.value = context.y.value + event.translationY;
		})
		.onEnd((event) => {
			const snapPointX = snapPoint(
				event.translationX,
				event.velocityX,
				snapPointsX
			);
			const snapPointY = snapPoint(
				event.translationY,
				event.velocityY,
				snapPointsY
			);

			// translateX.value = withSpring(snapPointX, {
			// 	damping: springDamping,
			// 	velocity: event.velocityX,
			// });
			// translateY.value = withSpring(snapPointY, {
			// 	damping: springDamping,
			// 	velocity: event.velocityY,
			// });
			isGestureActive.value = false;
			runOnJS(successHaptic)();
		});

	const rStyle = useAnimatedStyle(() => {
		return {
			zIndex: isGestureActive.value ? 100 : 0,
			position: 'absolute',
			left: pos.x.value,
			top: pos.y.value,
			transform: [
				{ translateX: translateX.value },
				{ translateY: translateY.value },
			],
		};
	});

	return (
		<GestureDetector gesture={pan}>
			<AnimatedCard
				width={ANSWER_BOX_WIDTH}
				height={ANSWER_BOX_HEIGHT}
				variant='questionBox'
				alignItems='center'
				justifyContent='center'
				style={[rStyle]}>
				<AnimatedText variant='questionText'>{content}</AnimatedText>
			</AnimatedCard>
		</GestureDetector>
	);
}
