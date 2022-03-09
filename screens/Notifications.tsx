import React from 'react';
import Box from '../components/atoms/Box';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import Text from '../components/atoms/Text';

import { NavigationTypes } from '../types';

interface Props extends NavigationTypes {}

export default function Path({ navigation }: Props) {
	return (
		<RestyledSafeAreaView edges={['right', 'top', 'left']}>
			<Box flex={1}>
				<Text variant='header'>Notifications</Text>
			</Box>
		</RestyledSafeAreaView>
	);
}
