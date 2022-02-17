import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	withSpring,
} from 'react-native-reanimated';
import { useItemHeight } from '../../hooks/useItemHeight';
import AnimatedCard from '../atoms/AnimatedCard';
import Box from '../atoms/Box';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import FormTextInput from '../atoms/FormTextInput';
import Text from '../atoms/Text';

interface Props {
	idx: number;
	translateY: Animated.SharedValue<number>;
	answered: boolean;
	setAnswered: React.Dispatch<React.SetStateAction<boolean>>;
	allowScroll: boolean;
	setAllowScroll: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FeedItemQuestion({
	idx,
	translateY,
	answered,
	setAnswered,
	allowScroll,
	setAllowScroll,
}: Props) {
	const itemHeight = useItemHeight();

	const isQuestionPage =
		translateY.value === idx * itemHeight * 2 + itemHeight;

	const inputRange = [
		idx * itemHeight * 2,
		idx * itemHeight * 2 + itemHeight,
		(idx + 1) * itemHeight * 2,
	];

	const rStyle = useAnimatedStyle(() => {
		const scale = interpolate(
			translateY.value,
			inputRange,
			[0, 1, 0],
			Extrapolate.CLAMP
		);
		const opacity = interpolate(
			translateY.value,
			inputRange,
			[-1, 1, -1],
			Extrapolate.CLAMP
		);

		return { transform: [{ scale }], opacity };
	});

	useEffect(() => {
		console.log(allowScroll);
		if (isQuestionPage) {
			setAllowScroll(false);
		}
	});

	function handleAnswer() {
		setAnswered(true);
		if (answered && isQuestionPage) {
			setAllowScroll(true);
		}
	}

	return (
		<Box alignItems='center' justifyContent='center' height={itemHeight}>
			<AnimatedCard style={rStyle}>
				<Text variant='cardHeader'>Question:</Text>
				<Text variant='body' marginTop='l'>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Natus nesciunt voluptatum aliquid. Earum dicta rerum error
					autem exercitationem, eum qui!
				</Text>
				<Box
					flexDirection='row'
					alignItems='center'
					justifyContent='center'
					marginTop='l'>
					<FormTextInput
						variant={'primary'}
						placeholder='Enter Answer...'
					/>
					<Button
						label='Submit'
						variant='primary'
						onPress={handleAnswer}
						marginHorizontal='s'
						paddingVertical='m'
						paddingHorizontal='m'
					/>
				</Box>
			</AnimatedCard>
		</Box>
	);
}
