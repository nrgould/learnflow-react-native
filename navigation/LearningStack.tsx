import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import ModuleDetails from '../screens/ModuleDetails';
import Path from '../screens/Path';
import { Theme } from '../theme/theme';

const LearningStackScreen = createNativeStackNavigator();

export default function LearningStack() {
	const theme = useTheme<Theme>();

	const { background, primaryText } = theme.colors;

	return (
		<LearningStackScreen.Navigator
			screenOptions={{
				headerShown: false,
				headerTintColor: primaryText,
				headerStyle: {
					backgroundColor: background,
				},
				headerBackTitleVisible: false,
			}}>
			<LearningStackScreen.Screen name='MyLearning' component={Path} />
			<LearningStackScreen.Screen
				name='ModuleDetails'
				component={ModuleDetails}
			/>
		</LearningStackScreen.Navigator>
	);
}
