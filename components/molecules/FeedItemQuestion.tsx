import React from 'react';
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
}

export default function FeedItemQuestion({ idx, translateY }: Props) {
	const itemHeight = useItemHeight();

	// console.log(idx);
	// console.log('Before: ', idx * itemHeight * 2);
	// console.log('Center: ', idx * itemHeight * 2 + itemHeight);
	// console.log('After: ', (idx + 1) * itemHeight * 2);

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

		return { transform: [{ scale }] };
	});

	return (
		<Box alignItems='center' justifyContent='center' height={itemHeight}>
			{/* <Animated.View style={[styles.card, rStyle]}> */}
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
						onPress={() => console.log('submit question')}
						marginHorizontal='s'
						paddingVertical='m'
						paddingHorizontal='m'
					/>
				</Box>
				{/* </Animated.View> */}
			</AnimatedCard>
		</Box>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#211C1E',
		shadowColor: '#161314',
		shadowOffset: { width: 2, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 20,
		borderRadius: 12,
		marginTop: 12,
		justifyContent: 'center',
		padding: 8,
		paddingTop: 12,
		position: 'relative',
	},
});
