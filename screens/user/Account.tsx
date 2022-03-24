import React from 'react';
import Box from '../../components/atoms/Box';
import RestyledSafeAreaView from '../../components/atoms/RestyledSafeAreaView';
import PageHeaderBack from '../../components/molecules/PageHeaderBack';
import { NavigationTypes } from '../../types';

export default function Account({ navigation }: NavigationTypes) {
	return (
		<RestyledSafeAreaView>
			<Box height='100%' backgroundColor='background'>
				<PageHeaderBack title='Account' navigation={navigation} />
			</Box>
		</RestyledSafeAreaView>
	);
}
