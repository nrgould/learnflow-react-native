import React, { useEffect } from 'react';
import Box from './Box';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
	useAnimatedProps,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { isSmallDevice, SCREEN_HEIGHT } from '../../theme/layout';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/theme';
import Text from './Text';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CIRCLE_LENGTH = isSmallDevice ? 190 : 210;
const R = isSmallDevice ? 35 : CIRCLE_LENGTH / (2 * Math.PI);
const STROKE_WIDTH = 8;

interface Props {
	completedContent: number;
	totalContent: number;
	color?: any;
	backgroundColor?: any;
}

export default function CircularProgressBar({
	completedContent,
	totalContent,
	color,
	backgroundColor,
}: Props) {
	const theme = useTheme<Theme>();

	const { primary, primaryCardBackground } = theme.colors;
	const progress = useSharedValue(0);
	const progressVal = completedContent / totalContent;

	const cardHeight = SCREEN_HEIGHT / 8;

	useEffect(() => {
		progress.value = withTiming(progressVal, { duration: 1000 });
	});

	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
	}));
	return (
		<Box alignItems='center' justifyContent='center'>
			<Svg viewBox='0 0 100 100' height={cardHeight} width={cardHeight}>
				<Circle
					cx='50'
					cy='50'
					r={R}
					stroke={
						backgroundColor
							? backgroundColor
							: primaryCardBackground
					}
					strokeWidth={STROKE_WIDTH + 4}
				/>
				<AnimatedCircle
					cx='50'
					cy='50'
					r={R}
					stroke={color ? color : primary}
					strokeWidth={STROKE_WIDTH}
					strokeLinecap='round'
					strokeDasharray={CIRCLE_LENGTH}
					animatedProps={animatedProps}
				/>
			</Svg>
			<Text
				variant='stat'
				style={{
					color: color ? color : primary,
					position: 'absolute',
					top: isSmallDevice ? cardHeight / 2.7 : cardHeight / 2.6,
					left: isSmallDevice ? cardHeight / 2.9 : cardHeight / 2.95,
					fontSize: isSmallDevice ? 14 : 18,
				}}>
				{Math.ceil(progressVal * 100)}%
			</Text>
		</Box>
	);
}
