import React from 'react';
import Box from '../components/atoms/Box';
import FormTextInput from '../components/atoms/FormTextInput';
import Text from '../components/atoms/Text';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';

export default function Discover() {
	return (
		<RestyledSafeAreaView>
			<Box height='100%' backgroundColor={'background'}>
				<Box marginHorizontal='l'>
					<Text variant='header'>Discover</Text>
					<FormTextInput
						placeholder='What do you want to learn?'
						variant={'primary'}
						style={{ minWidth: '100%' }}
					/>
				</Box>
			</Box>
		</RestyledSafeAreaView>
	);
}
