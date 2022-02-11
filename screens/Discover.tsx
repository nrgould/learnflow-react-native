import React from 'react';
import Box from '../components/atoms/Box';
import FormTextInput from '../components/atoms/FormTextInput';
import Text from '../components/atoms/Text';

export default function Discover() {
	return (
		<Box height='100%' backgroundColor={'background'}>
			<Box marginTop='xxl' marginHorizontal='l'>
				<Text variant='header'>Discover</Text>
				<FormTextInput
					placeholder='Look for something you want to learn...'
					variant={'primary'}
					style={{ minWidth: '100%' }}
				/>
			</Box>
		</Box>
	);
}
