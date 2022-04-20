import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import Feed from '../screens/Feed';
import DiscoverStack from './DiscoverStack';
import LearningStack from './LearningStack';
import { isSmallDevice } from '../theme/layout';
import ProfileStack from './ProfileStack';
import Create from '../screens/Create';

const BottomTabs = createBottomTabNavigator();

export default function BottomTabsNavigator() {
	const theme = useTheme<Theme>();

	const { icon: iconColor, activeIcon, bottomTabBackground } = theme.colors;
	return (
		//navigation container is in LoadAssets for future state persistence
		<BottomTabs.Navigator
			initialRouteName='Feed'
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					height: isSmallDevice
						? theme.constants.bottomTabHeightSmall
						: theme.constants.bottomTabHeightLarge,
					backgroundColor: bottomTabBackground,
					borderTopWidth: 0,
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
						backgroundColor: bottomTabBackground,
						// borderTopColor: background,
						borderTopWidth: 0,
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
							name={focused ? 'ios-search' : 'ios-search-outline'}
							size={size}
							color={color}
						/>
					),
				}}
				name='DiscoverStack'
				component={DiscoverStack}
			/>
			<BottomTabs.Screen
				options={{
					tabBarIcon: ({ color, size, focused }: any) => (
						<Ionicons
							name={focused ? 'add-circle' : 'add-circle-outline'}
							size={size}
							color={color}
						/>
					),
				}}
				name='Create'
				component={Create}
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
				component={LearningStack}
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
				name='ProfileStack'
				component={ProfileStack}
			/>
		</BottomTabs.Navigator>
	);
}
