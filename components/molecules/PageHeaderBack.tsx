import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationTypes } from '../../types';
import Box from '../atoms/Box';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

interface Props extends NavigationTypes {
	title: string;
}

export default function PageHeaderBack({ title, navigation }: Props) {
	return (
		<Box
			width='100%'
			marginHorizontal='s'
			flexDirection='row'
			alignItems='center'
			justifyContent='flex-start'>
			<TouchableOpacity>
				<Icon
					name='chevron-back-outline'
					color='activeIcon'
					size={36}
					style={{ marginRight: 12 }}
					onPress={() => navigation.goBack()}
				/>
			</TouchableOpacity>
			<Text variant='header' fontSize={28}>
				{title}
			</Text>
		</Box>
	);
}
