import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';

import React from 'react';
import { Theme } from '../theme/theme';
import SavePostScreen from '../components/organisms/create/SavePost';
import Create from '../screens/Create';

const CreateStackScreen = createNativeStackNavigator();

export default function CreateStack() {
	const theme = useTheme<Theme>();

	const { background, primaryText } = theme.colors;

	return (
		<CreateStackScreen.Navigator
			screenOptions={{
				headerShown: false,
				headerTintColor: primaryText,
				headerStyle: {
					backgroundColor: background,
				},
				headerBackTitleVisible: false,
			}}>
			<CreateStackScreen.Screen name='Create' component={Create} />
			<CreateStackScreen.Screen
				name='SavePost'
				component={SavePostScreen}
			/>
		</CreateStackScreen.Navigator>
	);
}
