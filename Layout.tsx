import React from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabsNavigator from './navigation/BottomTabsNavigator';
import { useAppSelector } from './hooks/reduxHooks';
import theme, { darkTheme } from './theme/theme';
import AuthStack from './navigation/AuthStack';
import useAuthentication from './hooks/useAuthentication';

export default function Layout() {
	const darkMode = useAppSelector((state) => state.theme.darkMode);
	const { user } = useAuthentication();

	return (
		<ThemeProvider theme={darkMode ? darkTheme : theme}>
			<StatusBar style={darkMode ? 'light' : 'dark'} />
			<SafeAreaProvider>
				{user ? <BottomTabsNavigator /> : <AuthStack />}
			</SafeAreaProvider>
		</ThemeProvider>
	);
}
