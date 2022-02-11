import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import { useState } from 'react';
import { Provider } from 'react-redux';
import Feed from './screens/Feed';
import Notifications from './screens/Notifications';
import Path from './screens/Path';
import Profile from './screens/Profile';
import Search from './screens/Discover';
import { store } from './store/store';
import theme, { darkTheme } from './theme/theme';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const BottomTabs = createBottomTabNavigator();

const fetchFonts = () => {
	return Font.loadAsync({
		'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
		'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
		'poppins-semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),
		'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
	});
};

export default function App() {
	const [darkMode, setDarkMode] = useState(true);
	const [dataLoaded, setDataLoaded] = useState(false);

	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
				onError={(error: any) => console.log(error)}
			/>
		);
	}

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
						<BottomTabs.Screen
							name='Feed'
							options={{
								tabBarIcon: ({ color, size, focused }: any) => (
									<Ionicons
										name={
											focused
												? 'ios-home'
												: 'ios-home-outline'
										}
										size={size}
										color={color}
									/>
								),
							}}>
							{() => (
								<Feed
									darkMode={darkMode}
									setDarkMode={setDarkMode}
								/>
							)}
						</BottomTabs.Screen>
						<BottomTabs.Screen
							options={{
								tabBarIcon: ({ color, size, focused }: any) => (
									<Ionicons
										name={
											focused
												? 'ios-search'
												: 'ios-search-outline'
										}
										size={size}
										color={color}
									/>
								),
							}}
							name='Search'
							component={Search}
						/>
						<BottomTabs.Screen
							options={{
								tabBarIcon: ({ color, size, focused }: any) => (
									<Ionicons
										name={
											focused
												? 'ios-analytics'
												: 'ios-analytics-outline'
										}
										size={size}
										color={color}
									/>
								),
							}}
							name='Path'
							component={Path}
						/>
						<BottomTabs.Screen
							options={{
								tabBarIcon: ({ color, size, focused }: any) => (
									<Ionicons
										name={
											focused
												? 'ios-notifications'
												: 'ios-notifications-outline'
										}
										size={size}
										color={color}
									/>
								),
							}}
							name='Notifications'
							component={Notifications}
						/>
						<BottomTabs.Screen
							options={{
								tabBarIcon: ({ color, size, focused }: any) => (
									<Ionicons
										name={
											focused
												? 'person'
												: 'person-outline'
										}
										size={size}
										color={color}
									/>
								),
							}}
							name='Profile'
							component={Profile}
						/>
					</BottomTabs.Navigator>
				</NavigationContainer>
			</ThemeProvider>
		</Provider>
	);
}
