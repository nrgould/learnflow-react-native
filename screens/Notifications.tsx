import React from 'react';
import Box from '../components/atoms/Box';
import Text from '../components/atoms/Text';

export default function Notifications() {
	return (
		<Box height='100%' backgroundColor='background'>
			<Box marginTop='xxl' marginHorizontal='l'>
				<Text variant='header'>Notifications</Text>
			</Box>
		</Box>
	);
}
