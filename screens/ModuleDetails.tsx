import { useEffect } from 'react';
import { NavigationTypes } from '../types';
import Box from '../components/atoms/Box';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import Text from '../components/atoms/Text';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { clearModule, fetchModuleAsync } from '../store/moduleSlice';
import Card from '../components/atoms/Card';
import RestyledScrollView from '../components/atoms/RestyledScrollView';

export default function ModuleDetails({ navigation, route }: NavigationTypes) {
	const title: string = route.params.title;
	const dispatch = useAppDispatch();
	const { selectedModule } = useAppSelector((state) => state.module);
	const status = useAppSelector((state) => state.module.status);

	useEffect(() => {
		dispatch(fetchModuleAsync());
		navigation.setOptions({
			headerShown: false,
			headerTitle: title,
		});

		return () => {
			dispatch(clearModule());
		};
	}, [dispatch]);

	if (status === 'loading') {
		return (
			<Box
				flex={1}
				alignItems='center'
				justifyContent='center'
				backgroundColor='background'>
				<Text variant='header'>Loading...</Text>
			</Box>
		);
	}
	return (
		<RestyledSafeAreaView edges={['top', 'left', 'right']}>
			<RestyledScrollView
				style={{ minHeight: '100%' }}
				backgroundColor='background'>
				<Box
					marginHorizontal='l'
					height='100%'
					backgroundColor='background'>
					<Box marginVertical='m'>
						<Text variant='header'>{selectedModule?.title}</Text>
						<Text variant='body' numberOfLines={4}>
							{selectedModule?.description}
						</Text>
					</Box>
					{selectedModule?.content.map((content, i) => {
						return (
							<Card padding='xl' key={i} variant='primary'>
								<Text variant='subheader'>{content.title}</Text>
							</Card>
						);
					})}
				</Box>
			</RestyledScrollView>
		</RestyledSafeAreaView>
	);
}
