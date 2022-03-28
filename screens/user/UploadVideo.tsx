import React, { useCallback } from 'react';
import Box from '../../components/atoms/Box';
import Button from '../../components/atoms/Button';
import Card from '../../components/atoms/Card';
import RestyledSafeAreaView from '../../components/atoms/RestyledSafeAreaView';
import Text from '../../components/atoms/Text';
import PageHeaderBack from '../../components/molecules/PageHeaderBack';
import { useItemHeight } from '../../hooks/useItemHeight';

export default function UploadVideo() {
	const itemHeight = useItemHeight();

	const onUpload = useCallback(() => {
		console.log('uploading video');
	}, []);
	return (
		<RestyledSafeAreaView edges={['top', 'right', 'left']}>
			<Box
				height={itemHeight}
				marginTop='s'
				marginHorizontal='m'
				backgroundColor='background'>
				<PageHeaderBack title='Upload Video' />
				<Card
					variant='primary'
					justifyContent='center'
					alignItems='center'>
					<Text variant='cardHeader'>Choose File</Text>
					<Button label='Choose File' onPress={onUpload} />
				</Card>
			</Box>
		</RestyledSafeAreaView>
	);
}
