import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image } from 'react-native';
import Box from '../../atoms/Box';
import FormTextInput from '../../atoms/FormTextInput';
import Button from '../../atoms/Button';
import { SCREEN_WIDTH } from '../../../theme/layout';
import PageHeaderBack from '../../molecules/PageHeaderBack';

export default function SavePostScreen({ route }: any) {
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const navigation = useNavigation<any>();

	return (
		<Box flex={1} paddingTop='xl' backgroundColor='background'>
			<PageHeaderBack title='Video Details' />
			<Box margin='l' flexDirection='row' justifyContent='space-between'>
				<Box flexDirection='column' alignItems='flex-start'>
					<FormTextInput
						maxLength={150}
						multiline
						onChangeText={(text) => setDescription(text)}
						placeholder='Describe your video'
						returnKeyType='done'
						blurOnSubmit
					/>
					<FormTextInput
						maxLength={1}
						numberOfLines={1}
						onChangeText={(text) => setCategory(text)}
						placeholder='Course'
						returnKeyType='done'
						blurOnSubmit
					/>
					<FormTextInput
						maxLength={1}
						numberOfLines={1}
						onChangeText={(text) => setCategory(text)}
						placeholder='Category'
						returnKeyType='done'
						blurOnSubmit
					/>
				</Box>
				<Image
					style={{
						aspectRatio: 9 / 16,
						backgroundColor: 'black',
						width: SCREEN_WIDTH * 0.3,
					}}
					source={{ uri: route.params.source }}
				/>
			</Box>
			<Box flex={1} />
			<Box
				flexDirection='row'
				alignItems='center'
				justifyContent='space-around'
				margin='l'>
				<Button
					variant='tertiary'
					width={SCREEN_WIDTH * 0.41}
					label='Cancel'
					tall
					onPress={() => navigation.goBack()}
				/>
				<Button
					variant='secondary'
					label='Add Question'
					tall
					width={SCREEN_WIDTH * 0.41}
					onPress={() =>
						navigation.navigate('CreateQuestion', {
							source: route.params.source,
							sourceThumb: route.params.sourceThumb,
							description,
							category,
							courseId: 'i4wTZ9ioTEj7dte4O9Zb',
						})
					}
				/>
			</Box>
		</Box>
	);
}
