import { useTheme } from '@shopify/restyle';
import React from 'react';
import Box from '../components/atoms/Box';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import Text from '../components/atoms/Text';
import PathModule from '../components/molecules/PathModule';

export default function Path() {
	return (
		<RestyledSafeAreaView>
			<Box height='100%' backgroundColor='background'>
				<Box marginTop='s' marginHorizontal='l'>
					<Text variant='header'>My Learning</Text>
					<PathModule />
					<PathModule />
					<PathModule />
				</Box>
			</Box>
		</RestyledSafeAreaView>
	);
}
