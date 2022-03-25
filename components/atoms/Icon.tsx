import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/theme';

interface Props extends React.ComponentProps<typeof Ionicons> {
	color?:
		| 'success'
		| 'error'
		| 'warning'
		| 'activeIcon'
		| 'white'
		| 'secondaryText';
}

export default function Icon({ color, ...props }: Props) {
	const theme = useTheme<Theme>();
	const {
		success,
		warning,
		error,
		icon,
		activeIcon,
		whiteBtn,
		secondaryText,
	} = theme.colors;

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
		case 'secondaryText':
			iconColor = secondaryText;
			break;
		default:
			iconColor = icon;
			break;
	}

	return <Ionicons color={iconColor} {...props} />;
}
