import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme/theme';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Feed from '../screens/Feed';
import DiscoverStackScreen from './DiscoverStackScreen';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import LearningStackScreen from './LearningStackScreen';
import Question from '../screens/Question';

const BottomTabs = createBottomTabNavigator();

export default function BottomTabsNavigator() {
	const theme = useTheme<Theme>();

	const { icon: iconColor, activeIcon, background, border } = theme.colors;

	const isSmallDevice = Dimensions.get('window').height < 700;
	return (
		<NavigationContainer>
			<BottomTabs.Navigator
				initialRouteName='Notifications'
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
