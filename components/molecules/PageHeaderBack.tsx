import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Box from '../atoms/Box';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

interface Props {
	title: string;
}

export default function PageHeaderBack({ title }: Props) {
	const navigation = useNavigation<any>();
	return (
		<Box
			width='100%'
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
