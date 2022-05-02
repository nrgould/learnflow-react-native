import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import Box from '../../atoms/Box';
import FormTextInput from '../../atoms/FormTextInput';
import Button from '../../atoms/Button';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { createPost } from '../../../store/postSlice';

export default function SavePostScreen({ route }: any) {
	const [description, setDescription] = useState('');
	const [requestRunning, setRequestRunning] = useState(false);
	const navigation = useNavigation();
	const userId = useAppSelector((state) => state.auth.userId);
	const dispatch = useAppDispatch();

	console.log(route.params.source);

	const handleSavePost = () => {
		setRequestRunning(true);
		dispatch(
			createPost({
				description,
				video: route.params.source,
				thumbnail: route.params.sourceThumb,
				courseId: 'i4wTZ9ioTEj7dte4O9Zb',
				userId,
			})
		)
			.then(() => navigation.dispatch(StackActions.popToTop()))
			.catch(() => setRequestRunning(false));
	};

	if (requestRunning) {
		return (
			<Box flex={1} alignItems='center' justifyContent='center'>
				<ActivityIndicator color='red' size='large' />
			</Box>
		);
	}
	return (
		<Box flex={1} paddingTop='xl' backgroundColor='background'>
			<Box margin='l' flexDirection='row'>
				<FormTextInput
					maxLength={150}
					multiline
					onChangeText={(text) => setDescription(text)}
					placeholder='Describe your video'
				/>
				<Image
					style={{
						aspectRatio: 9 / 16,
						backgroundColor: 'black',
						width: 60,
					}}
					source={{ uri: route.params.source }}
				/>
			</Box>
			<Box flex={1} />
			<Box flexDirection='row' margin='l'>
				<Button
					variant='tertiary'
					label='Cancel'
					onPress={() => navigation.goBack()}
				/>
				<Button
					variant='primary'
					label='Post'
					onPress={() => handleSavePost()}
				/>
			</Box>
		</Box>
	);
}
