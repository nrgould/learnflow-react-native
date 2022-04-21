import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { CourseModuleType } from '../../types';
import Card from '../atoms/Card';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

interface Props {
	module: CourseModuleType;
}

export default function CourseContentItem({ module }: Props) {
	const navigation = useNavigation<any>();

	const completed = false;
	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate('CourseFeed', { id: module.id })
			}>
			<Card
				padding='l'
				variant='primary'
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'>
				<Text variant='subheader'>{module.title}</Text>
				{completed ? (
					<Icon size={32} name='checkmark-sharp' color='success' />
				) : (
					<Icon
						name='chevron-forward-outline'
						color='activeIcon'
						size={32}
					/>
				)}
			</Card>
		</TouchableOpacity>
	);
}
