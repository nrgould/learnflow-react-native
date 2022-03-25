import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Theme } from '../../theme/theme';
import { ModuleType } from '../../types';
import Box from '../atoms/Box';
import Card from '../atoms/Card';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

interface Props {
	module: ModuleType;
	color: string;
}

export default function DiscoverModule({ module }: Props) {
	const navigation = useNavigation<any>();
	const theme = useTheme<Theme>();
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
					<Box
						flexDirection='row'
						alignItems='center'
						justifyContent='space-evenly'>
						<Icon
							name='bookmark-outline'
							size={28}
							style={{ marginRight: theme.spacing.xs }}
						/>
					</Box>
				</Box>
				<Text
					marginTop='s'
					variant='body'
					numberOfLines={2}
					color='secondaryText'>
					{description}
				</Text>
			</Card>
		</TouchableOpacity>
	);
}
