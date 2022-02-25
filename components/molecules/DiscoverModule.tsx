import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationTypes } from '../../types';
import Box from '../atoms/Box';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import Text from '../atoms/Text';

interface Props extends NavigationTypes {
	module: any;
}

export default function DiscoverModule({ navigation, module }: Props) {
	const { title, description } = module;

	function navigationHandler() {
		navigation.navigate('ModuleDetails', { title: title });
	}

	return (
		<TouchableOpacity onPress={navigationHandler}>
			<Card variant='primary'  style={{ width: '100%' }}>
				<Text variant='cardHeader'>Calculus I</Text>
				<Text
					marginTop='s'
					variant='body'
					numberOfLines={2}
					color='secondaryText'>
					{description}
				</Text>
				<Box
					width='100%'
					flexDirection='row'
					marginTop='s'
					alignItems='center'
					justifyContent='flex-end'>
					<Button
						label='View'
						variant='secondary'
						onPress={navigationHandler}
						marginRight='s'
					/>
					<Button
						label='Add'
						variant='primary'
						onPress={navigationHandler}
					/>
				</Box>
			</Card>
		</TouchableOpacity>
	);
}
