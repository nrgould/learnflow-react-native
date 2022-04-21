import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import Feed from '../screens/Feed';
import Path from '../screens/Path';
import { Theme } from '../theme/theme';
import CourseDetails from '../screens/course/CourseDetails';

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
				name='CourseDetails'
				component={CourseDetails}
			/>
			<LearningStackScreen.Screen name='CourseFeed'>
				{() => <Feed course />}
			</LearningStackScreen.Screen>
		</LearningStackScreen.Navigator>
	);
}
