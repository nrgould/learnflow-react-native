import React, { useEffect } from 'react';
import { NavigationTypes } from '../types';
import Box from '../components/atoms/Box';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import Text from '../components/atoms/Text';

export default function ModuleDetails({ navigation, route }: NavigationTypes) {
	const title: string = route.params.title;

	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTitle: title,
		});
	});
	return (
		<RestyledSafeAreaView>
			<Box
				marginHorizontal='l'
				height='100%'
				backgroundColor='background'>
				<Text variant='body'>{title}</Text>
			</Box>
		</RestyledSafeAreaView>
	);
}
