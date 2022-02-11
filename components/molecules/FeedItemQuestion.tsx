import React from 'react';
import { useWindowDimensions } from 'react-native';
import Box from '../atoms/Box';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import FormTextInput from '../atoms/FormTextInput';
import Text from '../atoms/Text';

export default function FeedItemQuestion() {
	const { height } = useWindowDimensions();
	return (
		<Box alignItems='center' justifyContent='center' height={height - 75}>
			<Card variant={'primary'}>
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
					/>
				</Box>
			</Card>
		</Box>
	);
}
