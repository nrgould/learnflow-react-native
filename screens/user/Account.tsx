import React from 'react';
import Box from '../../components/atoms/Box';
import RestyledSafeAreaView from '../../components/atoms/RestyledSafeAreaView';
import PageHeaderBack from '../../components/molecules/PageHeaderBack';

export default function Account() {
	return (
		<RestyledSafeAreaView>
			<Box height='100%' backgroundColor='background'>
				<PageHeaderBack title='Account' />
			</Box>
		</RestyledSafeAreaView>
	);
}
