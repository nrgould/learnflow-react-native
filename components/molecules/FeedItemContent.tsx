import React from 'react';
import { ImageBackground } from 'react-native';
import Box from '../atoms/Box';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import Text from '../atoms/Text';
import Image from '../../assets/IMG_3711.jpg';
import * as Haptics from 'expo-haptics';
import { useItemHeight } from '../../hooks/useItemHeight';

export default function FeedItemContent() {
	const height = useItemHeight();
	return (
		<ImageBackground
			style={{ height: height, width: '100%' }}
			source={Image}>
			<Box alignItems='center' justifyContent='center' height={height}>
				<Card variant={'primary'}>
					<Text variant='header'>Feed Item</Text>
					<Box
						flexDirection='row'
						alignItems='flex-end'
						justifyContent='center'
						marginTop='xxl'>
						<Button
							label='Success'
							variant='success'
							onPress={() =>
								Haptics.notificationAsync(
									Haptics.NotificationFeedbackType.Success
								)
							}
							marginHorizontal='s'
						/>
						<Button
							label='Error'
							variant='error'
							onPress={() =>
								Haptics.notificationAsync(
									Haptics.NotificationFeedbackType.Error
								)
							}
							marginHorizontal='s'
						/>
					</Box>
				</Card>
			</Box>
		</ImageBackground>
	);
}

// const styles = StyleSheet.create({
// 	image: {
// 		width:
// 	}
// })
