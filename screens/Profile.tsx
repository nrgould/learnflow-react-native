import React from 'react';
import Box from '../components/atoms/Box';
import Card from '../components/atoms/Card';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import Text from '../components/atoms/Text';

export default function Profile() {
	return (
		<RestyledSafeAreaView>
			<Box
				height='100%'
				marginTop='s'
				marginHorizontal='l'
				backgroundColor='background'>
				<Text variant='body'>Profile</Text>
			</Box>
		</RestyledSafeAreaView>
	);
}
