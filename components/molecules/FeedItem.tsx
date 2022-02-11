import React from 'react';
import { useWindowDimensions } from 'react-native';
import Box from '../atoms/Box';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import Text from '../atoms/Text';

export default function FeedItem() {
	const { height } = useWindowDimensions();
	return (
		<Box
			alignItems='center'
			justifyContent='center'
			height={height - 80}
			backgroundColor='background'>
			<Card variant='primary' flex={1}>
				<Text variant='header'>FeedItem</Text>
				<Box
					flexDirection='row'
					alignItems='center'
					justifyContent='center'>
					<Button
						label='Set Dark Mode'
						variant='success'
						onPress={() => console.log('nothing')}
						marginHorizontal='m'
					/>
					<Button
						label='Set Light Mode'
						variant='error'
						onPress={() => console.log('nothing')}
						marginHorizontal='m'
					/>
				</Box>
			</Card>
		</Box>
	);
}
