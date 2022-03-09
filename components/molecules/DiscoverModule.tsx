import { useTheme } from '@shopify/restyle';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Theme } from '../../theme/theme';
import { ModuleType, NavigationTypes } from '../../types';
import Box from '../atoms/Box';
import Card from '../atoms/Card';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

interface Props extends NavigationTypes {
	module: ModuleType;
	color: string;
}

export default function DiscoverModule({ navigation, module, color }: Props) {
	const theme = useTheme<Theme>();
	const { title, description } = module;

	const { activeIcon: icon } = theme.colors;

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
							size={24}
							color={icon}
							style={{ marginRight: theme.spacing.xs }}
						/>
						<Icon name='bulb' size={24} color={color} />
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
