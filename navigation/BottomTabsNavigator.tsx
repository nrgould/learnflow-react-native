import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import Feed from '../screens/Feed';
import DiscoverStackScreen from './DiscoverStackScreen';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import LearningStackScreen from './LearningStackScreen';
import Question from '../screens/Question';
import { isSmallDevice } from '../theme/layout';

const BottomTabs = createBottomTabNavigator();

export default function BottomTabsNavigator() {
	const theme = useTheme<Theme>();

	const { icon: iconColor, activeIcon, background, border } = theme.colors;
	return (
		<NavigationContainer>
			<BottomTabs.Navigator
				initialRouteName='Feed'
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarStyle: {
						height: isSmallDevice
							? theme.constants.bottomTabHeightSmall
							: theme.constants.bottomTabHeightLarge,
						backgroundColor: background,
						borderTopColor: border,
					},
					tabBarActiveTintColor: activeIcon,
					tabBarInactiveTintColor: iconColor,
				}}>
				<BottomTabs.Screen
					name='Feed'
					options={{
						tabBarStyle: {
							height: isSmallDevice
								? theme.constants.bottomTabHeightSmall
								: theme.constants.bottomTabHeightLarge,
							backgroundColor: background,
							borderTopColor: background,
						},
						tabBarIcon: ({ color, size, focused }: any) => (
							<Ionicons
								name={focused ? 'ios-home' : 'ios-home-outline'}
								size={size}
								color={color}
							/>
						),
					}}
					component={Feed}
				/>
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
					name='DiscoverStack'
					component={DiscoverStackScreen}
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
					name='LearningStack'
					component={LearningStackScreen}
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
					component={Question}
				/>
				<BottomTabs.Screen
					options={{
						tabBarIcon: ({ color, size, focused }: any) => (
							<Ionicons
								name={focused ? 'person' : 'person-outline'}
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
	);
}
