import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import { useState } from 'react';
import { Provider } from 'react-redux';
import Box from './components/atoms/Box';
import Feed from './screens/Feed';
import Notifications from './screens/Notifications';
import Path from './screens/Path';
import Profile from './screens/Profile';
import Search from './screens/Search';
import { store } from './store/store';
import theme, { darkTheme } from './theme/theme';

const BottomTabs = createBottomTabNavigator();

export default function App() {
	const [darkMode, setDarkMode] = useState(true);

	const {
		icon: iconDark,
		activeIcon: activeIconDark,
		border: borderDark,
		background: backgroundDark,
	} = darkTheme.colors;
	const { icon: iconColor, activeIcon, background, border } = theme.colors;

	return (
		<Provider store={store}>
			<ThemeProvider theme={darkMode ? darkTheme : theme}>
				<NavigationContainer>
					<BottomTabs.Navigator
						screenOptions={{
							headerShown: false,
							tabBarShowLabel: false,
							tabBarStyle: {
								backgroundColor: darkMode
									? backgroundDark
									: background,
								borderTopColor: darkMode ? borderDark : border,
							},
							tabBarActiveTintColor: darkMode
								? activeIconDark
								: activeIcon,
							tabBarInactiveTintColor: darkMode
								? iconDark
								: iconColor,
						}}>
						<BottomTabs.Screen name='Feed'>
							{() => (
								<Feed
									darkMode={darkMode}
									setDarkMode={setDarkMode}
								/>
							)}
						</BottomTabs.Screen>
						<BottomTabs.Screen name='Search' component={Search} />
						<BottomTabs.Screen name='Path' component={Path} />
						<BottomTabs.Screen
							name='Notifications'
							component={Notifications}
						/>
						<BottomTabs.Screen name='Profile' component={Profile} />
					</BottomTabs.Navigator>
				</NavigationContainer>
			</ThemeProvider>
		</Provider>
	);
}
