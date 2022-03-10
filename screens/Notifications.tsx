import React from 'react';
import Box from '../components/atoms/Box';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import Text from '../components/atoms/Text';

import { NavigationTypes } from '../types';

interface Props extends NavigationTypes {}

export default function Path({}: Props) {
	return (
		<RestyledSafeAreaView edges={['right', 'top', 'left']}>
			<Box height='100%' backgroundColor='background'>
				<Box marginHorizontal='l'>
					<Text variant='header'>Notifications</Text>
				</Box>
			</Box>
		</RestyledSafeAreaView>
	);
}
