import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ModuleType, NavigationTypes } from '../../types';
import Box from '../atoms/Box';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

interface Props extends NavigationTypes {
	module: ModuleType;
	color: string;
}

export default function DiscoverModule({ navigation, module, color }: Props) {
	const { title, description } = module;

	function navigationHandler() {
		navigation.navigate('ModuleDetails', { title: title });
	}

	return (
		<TouchableOpacity onPress={navigationHandler}>
			<Card variant='primary' style={{ width: '100%' }}>
				<Box
					flexDirection='row'
					justifyContent='space-between'
					alignItems='flex-start'>
					<Text variant='cardHeader'>{title}</Text>
					<Icon name='contract-sharp' size={42} color={color} />
				</Box>
				<Text
					marginTop='s'
					variant='body'
					numberOfLines={2}
					color='secondaryText'>
					{description}
				</Text>
				{/* <Box
					width='100%'
					flexDirection='row'
					marginTop='s'
					alignItems='center'
					justifyContent='flex-end'>
					<Button
						label='Add'
						variant='secondary'
						onPress={navigationHandler}
					/>
				</Box> */}
			</Card>
		</TouchableOpacity>
	);
}
