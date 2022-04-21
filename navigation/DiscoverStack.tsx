import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';

import React from 'react';
import Discover from '../screens/Discover';
import ModuleDetails from '../screens/course/CourseDetails';
import { Theme } from '../theme/theme';

const DiscoverStackScreen = createNativeStackNavigator();

export default function DiscoverStack() {
	const theme = useTheme<Theme>();

	const { background, primaryText } = theme.colors;

	return (
		<DiscoverStackScreen.Navigator
			screenOptions={{
				headerShown: false,
				headerTintColor: primaryText,
				headerStyle: {
					backgroundColor: background,
				},
				headerBackTitleVisible: false,
			}}>
			<DiscoverStackScreen.Screen name='Discover' component={Discover} />
			<DiscoverStackScreen.Screen
				name='ModuleDetails'
				component={ModuleDetails}
			/>
		</DiscoverStackScreen.Navigator>
	);
}
