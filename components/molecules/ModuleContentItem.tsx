import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationTypes, ParticleType } from '../../types';
import Card from '../atoms/Card';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

interface Props extends NavigationTypes {
	particle: ParticleType;
}

export default function ModuleContentItem({ particle, navigation }: Props) {
	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate('ModuleFeed', { id: particle.id })
			}>
			<Card
				padding='xl'
				variant='primary'
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'>
				<Text variant='subheader'>{particle.title}</Text>
				{particle.completed ? (
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
