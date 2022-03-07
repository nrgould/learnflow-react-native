import React, { useEffect } from 'react';
import Card from '../atoms/Card';
import Box from '../atoms/Box';
import { default as CustomText } from '../atoms/Text';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/theme';
import Animated, {
	useAnimatedProps,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Dimensions, TouchableOpacity } from 'react-native';
import { ModuleType, NavigationTypes } from '../../types';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const { height } = Dimensions.get('window');
const isSmallDevice = height < 700;

const CIRCLE_LENGTH = isSmallDevice ? 190 : 210;
const R = isSmallDevice ? 35 : CIRCLE_LENGTH / (2 * Math.PI);
const STROKE_WIDTH = 10;

interface Props extends NavigationTypes {
	progressColor: string;
	module: ModuleType;
}

export default function PathModule({
	progressColor,
	navigation,
	module,
}: Props) {
	const theme = useTheme<Theme>();
	const { background } = theme.colors;
	const { completedContent, totalContent } = module;
	const progress = useSharedValue(0);
	const progressVal = completedContent / totalContent;

	const cardHeight = height / 8;

	function onPress() {
		navigation.navigate('ModuleDetails', { title: module.title });
	}

	useEffect(() => {
		progress.value = withTiming(progressVal, { duration: 1000 });
	});

	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
	}));

	return (
		<TouchableOpacity onPress={onPress}>
			<Card
				variant='primary'
				marginVertical='s'
				style={{ height: cardHeight }}>
				<Box
					position='relative'
					flexDirection='row'
					alignItems='center'
					justifyContent='space-between'>
					<Box
						height={cardHeight}
						flexDirection='column'
						alignItems='flex-start'
						justifyContent='space-around'>
						<CustomText variant='cardHeader'>
							{module.title}
						</CustomText>
						<CustomText variant='body'>
							{completedContent} / {totalContent} Particles
						</CustomText>
					</Box>
					<Box alignItems='center' justifyContent='center'>
						<Svg
							viewBox='0 0 100 100'
							height={cardHeight}
							width={cardHeight}>
							<Circle
								cx='50'
								cy='50'
								r={R}
								stroke={background}
								strokeWidth={STROKE_WIDTH + 5}
							/>
							<AnimatedCircle
								cx='50'
								cy='50'
								r={R}
								stroke={progressColor}
								strokeWidth={STROKE_WIDTH}
								strokeLinecap='round'
								strokeDasharray={CIRCLE_LENGTH}
								animatedProps={animatedProps}
							/>
						</Svg>
						<CustomText
							variant='stat'
							style={{
								color: progressColor,
								position: 'absolute',
								top: isSmallDevice
									? cardHeight / 2.7
									: cardHeight / 2.6,
								left: isSmallDevice
									? cardHeight / 2.9
									: cardHeight / 2.8,
								// transform: [{ translateX: -7 }, { translateY: -5 }],
								fontSize: isSmallDevice ? 14 : 18,
							}}>
							{Math.ceil(progressVal * 100)}%
						</CustomText>
					</Box>
				</Box>
			</Card>
		</TouchableOpacity>
	);
}
