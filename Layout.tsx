import React from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabsNavigator from './navigation/BottomTabsNavigator';
import { useAppSelector } from './hooks/reduxHooks';
import theme, { darkTheme } from './theme/theme';
import AuthStack from './navigation/AuthStack';

export default function Layout() {
	const darkMode = useAppSelector((state) => state.theme.darkMode);
	const authenticated = useAppSelector((state) => state.auth.authenticated);

	return (
		<ThemeProvider theme={darkMode ? darkTheme : theme}>
			<StatusBar style={darkMode ? 'light' : 'dark'} />
			<SafeAreaProvider>
				{authenticated ? <BottomTabsNavigator /> : <AuthStack />}
			</SafeAreaProvider>
		</ThemeProvider>
	);
}
