import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/theme';

interface Props extends React.ComponentProps<typeof Ionicons> {
	color?: 'success' | 'error' | 'warning' | 'activeIcon' | 'white';
}

export default function Icon({ color, ...props }: Props) {
	const theme = useTheme<Theme>();
	const { success, warning, error, icon, activeIcon, whiteBtn } =
		theme.colors;
		
	let iconColor;

	switch (color) {
		case 'success':
			iconColor = success;
			break;
		case 'error':
			iconColor = error;
			break;
		case 'warning':
			iconColor = warning;
			break;
		case 'activeIcon':
			iconColor = activeIcon;
			break;
		case 'white':
			iconColor = whiteBtn;
			break;
		default:
			iconColor = icon;
			break;
	}

	return <Ionicons color={iconColor} {...props} />;
}
