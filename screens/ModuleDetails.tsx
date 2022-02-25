import React, { useEffect } from 'react';
import { ModuleType, NavigationTypes } from '../types';
import Box from '../components/atoms/Box';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import Text from '../components/atoms/Text';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchModuleAsync } from '../store/moduleSlice';

export default function ModuleDetails({ navigation, route }: NavigationTypes) {
	const title: string = route.params.title;
	const dispatch = useAppDispatch();
	const { selectedModule } = useAppSelector((state) => state.module);
	const status = useAppSelector((state) => state.module.status);

	console.log(status);

	useEffect(() => {
		dispatch(fetchModuleAsync());
		navigation.setOptions({
			headerShown: true,
			headerTitle: title,
		});
	});

	if (status === 'loading') {
		return (
			<Box backgroundColor='background'>
				<Text variant='header'>Loading...</Text>
			</Box>
		);
	}
	return (
		<RestyledSafeAreaView>
			<Box
				marginHorizontal='l'
				height='100%'
				backgroundColor='background'>
				<Text variant='body'>{selectedModule.title}</Text>
			</Box>
		</RestyledSafeAreaView>
	);
}
