import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { useAppSelector } from '../hooks/reduxHooks';
import { Theme } from '../theme/theme';
import AuthStack from './AuthStack';
import BottomTabsNavigator from './BottomTabsNavigator';

const RootStackScreen = createNativeStackNavigator();

export default function RootStack() {
	const theme = useTheme<Theme>();
	const { background, primaryText } = theme.colors;
	const user = useAppSelector((state) => state.auth.currentUser);

	return (
		<RootStackScreen.Navigator
			screenOptions={{
				headerShown: false,
				headerTintColor: primaryText,
				headerStyle: {
					backgroundColor: background,
				},
				headerBackTitleVisible: false,
			}}>
			{user ? (
				<RootStackScreen.Screen
					name='Main'
					component={BottomTabsNavigator}
				/>
			) : (
				<RootStackScreen.Screen name='Auth' component={AuthStack} />
			)}
		</RootStackScreen.Navigator>
	);
}
