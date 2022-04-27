import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import { Theme } from '../theme/theme';

const AuthStackScreen = createNativeStackNavigator();

export default function AuthStack() {
	const theme = useTheme<Theme>();
	const { background, primaryText } = theme.colors;

	return (
		<AuthStackScreen.Navigator
			screenOptions={{
				headerShown: false,
				headerTintColor: primaryText,
				headerStyle: {
					backgroundColor: background,
				},
				headerBackTitleVisible: false,
			}}>
			<AuthStackScreen.Screen name='Login' component={Login} />
			<AuthStackScreen.Screen name='Signup' component={Signup} />
		</AuthStackScreen.Navigator>
	);
}
