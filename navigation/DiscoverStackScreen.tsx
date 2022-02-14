import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';

const DiscoverStack = createNativeStackNavigator();
import React from 'react';
import Discover from '../screens/Discover';
import ModuleDetails from '../screens/ModuleDetails';
import { Theme } from '../theme/theme';

export default function DiscoverStackScreen() {
	const theme = useTheme<Theme>();

	const { background, primaryText } = theme.colors;

	return (
		<DiscoverStack.Navigator
			screenOptions={{
				headerShown: false,
				headerTintColor: primaryText,
				headerStyle: {
					backgroundColor: background,
				},
				headerBackTitleVisible: false,
			}}>
			<DiscoverStack.Screen name='Discover' component={Discover} />
			<DiscoverStack.Screen
				name='ModuleDetails'
				component={ModuleDetails}
			/>
		</DiscoverStack.Navigator>
	);
}
