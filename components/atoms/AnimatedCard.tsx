import { useTheme } from '@shopify/restyle';
import React from 'react';
import Animated from 'react-native-reanimated';
import { Theme } from '../../theme/theme';

interface Props {
	children: JSX.Element | JSX.Element[];
	style: object;
}

export default function AnimatedCard({ children, style, ...props }: Props) {
	const theme = useTheme<Theme>();

	const { primaryCardBackground, shadow } = theme.colors;
	const { m, xl } = theme.spacing;

	const styles = {
		backgroundColor: primaryCardBackground,
		shadowColor: shadow,
		shadowOffset: { width: 2, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 20,
		borderRadius: 12,
		marginTop: xl,
		justifyContent: 'center',
		padding: m,
		paddingTop: xl,
		position: 'relative',
	};

	return (
		<Animated.View {...props} style={[styles, style]}>
			{children}
		</Animated.View>
	);
}
