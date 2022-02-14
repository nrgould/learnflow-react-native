import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/theme';

interface Props extends React.ComponentProps<typeof SafeAreaView> {
	children: any;
}

export default function RestyledSafeAreaView({ children, ...props }: Props) {
	const theme = useTheme<Theme>();
	const { background } = theme.colors;
	return (
		<SafeAreaView {...props} style={{ backgroundColor: background }}>
			{children}
		</SafeAreaView>
	);
}
