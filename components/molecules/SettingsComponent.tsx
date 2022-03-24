import { Switch, TouchableOpacity } from 'react-native';
import React from 'react';
import Box from '../atoms/Box';
import Icon from '../atoms/Icon';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/theme';
import Text from '../atoms/Text';
import { Ionicons } from '@expo/vector-icons';

interface Props extends React.ComponentProps<typeof Ionicons> {
	label: string;
	switchAction?: any;
	switchValue?: boolean;
	onPress?: () => void;
}

export default function SettingsComponent({
	label,
	onPress,
	switchAction,
	switchValue,
	...props
}: Props) {
	const theme = useTheme<Theme>();
	const { activeIcon } = theme.colors;
	return (
		<TouchableOpacity disabled={!onPress} onPress={onPress}>
			<Box
				marginBottom='l'
				width='100%'
				flexDirection='row'
				alignItems='center'
				justifyContent='space-between'>
				<Box
					flexDirection='row'
					alignItems='center'
					justifyContent='flex-start'>
					<Icon
						{...props}
						color={activeIcon}
						size={32}
						style={{ marginRight: 12 }}
					/>
					<Text variant='settingText'>{label}</Text>
				</Box>
				{switchAction ? (
					<Switch value={switchValue} onValueChange={switchAction} />
				) : (
					<Icon
						name='chevron-forward-outline'
						color={activeIcon}
						size={32}
						style={{ marginRight: 12 }}
					/>
				)}
			</Box>
		</TouchableOpacity>
	);
}
