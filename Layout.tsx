import React, { useState } from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabsNavigator from './navigation/BottomTabsNavigator';
import { useAppSelector } from './hooks/reduxHooks';
import theme, { darkTheme } from './theme/theme';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase/config';
import AuthStack from './navigation/AuthStack';

const auth = getAuth(app);

export default function Layout() {
	const [authenticated, setAuthenticated] = useState(false);
	const darkMode = useAppSelector((state) => state.theme.darkMode);

	onAuthStateChanged(auth, (user) => {
		if (user !== null) {
			console.log('AUTH: Authenticated.');
			setAuthenticated(true);
		} else {
			setAuthenticated(false);
		}
	});

	return (
		<ThemeProvider theme={darkMode ? darkTheme : theme}>
			<StatusBar style={darkMode ? 'light' : 'dark'} />
			<SafeAreaProvider>
				{authenticated ? <BottomTabsNavigator /> : <AuthStack />}
			</SafeAreaProvider>
		</ThemeProvider>
	);
}
