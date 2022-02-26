import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import ModuleDetails from '../screens/ModuleDetails';
import Path from '../screens/Path';
import { Theme } from '../theme/theme';

const LearningStack = createNativeStackNavigator();

export default function LearningStackScreen() {
	const theme = useTheme<Theme>();

	const { background, primaryText } = theme.colors;

	return (
		<LearningStack.Navigator
			screenOptions={{
				headerShown: false,
				headerTintColor: primaryText,
				headerStyle: {
					backgroundColor: background,
				},
				headerBackTitleVisible: false,
			}}>
			<LearningStack.Screen name='MyLearning' component={Path} />
			<LearningStack.Screen
				name='ModuleDetails'
				component={ModuleDetails}
			/>
		</LearningStack.Navigator>
	);
}
