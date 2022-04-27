import React from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppSelector } from './hooks/reduxHooks';
import theme, { darkTheme } from './theme/theme';
import RootStack from './navigation/RootStack';

export default function Layout() {
	const darkMode = useAppSelector((state) => state.theme.darkMode);

	return (
		<ThemeProvider theme={darkMode ? darkTheme : theme}>
			<StatusBar style={darkMode ? 'light' : 'dark'} />
			<SafeAreaProvider>
				<RootStack />
			</SafeAreaProvider>
		</ThemeProvider>
	);
}
