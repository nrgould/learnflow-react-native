import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/theme';

export default function RestyledSafeAreaView({ children }: any) {
	const theme = useTheme<Theme>();
	const { background } = theme.colors;
	return (
		<SafeAreaView style={{ backgroundColor: background }}>
			{children}
		</SafeAreaView>
	);
}
