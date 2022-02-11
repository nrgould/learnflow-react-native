import React from 'react';
import Box from '../components/atoms/Box';
import Card from '../components/atoms/Card';
import Text from '../components/atoms/Text';

export default function Profile() {
	return (
		<Box
			height='100%'
			backgroundColor='background'
			flex={1}
			alignItems='center'
			justifyContent='center'>
			<Card variant='primary'>
				<Text variant='body'>Profile</Text>
			</Card>
		</Box>
	);
}
