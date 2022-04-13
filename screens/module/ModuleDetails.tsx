import { useEffect } from 'react';
import { NavigationTypes } from '../../types';
import Box from '../../components/atoms/Box';
import RestyledSafeAreaView from '../../components/atoms/RestyledSafeAreaView';
import Text from '../../components/atoms/Text';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { clearModule, fetchModuleAsync } from '../../store/moduleSlice';
import RestyledScrollView from '../../components/atoms/RestyledScrollView';
import PageHeaderBack from '../../components/molecules/PageHeaderBack';
import ModuleContentItem from '../../components/molecules/ModuleContentItem';
import { useNavigation } from '@react-navigation/native';
import { useSharedValue } from 'react-native-reanimated';

export default function ModuleDetails({ route }: NavigationTypes) {
	const title: string = route.params.title;
	const id: string = route.params.id;
	const dispatch = useAppDispatch();
	const module = useAppSelector((state) => state.module.selectedModule);
	const status = useAppSelector((state) => state.module.status);
	const navigation = useNavigation();
	const translateY = useSharedValue(0);

	useEffect(() => {
		dispatch(fetchModuleAsync(id));
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
				<Text variant='subheader'>Loading...</Text>
			</Box>
		);
	}

	if (status === 'failed') {
		return (
			<Box
				flex={1}
				alignItems='center'
				justifyContent='center'
				backgroundColor='background'>
				<Text variant='subheader' color='error'>
					Can't find this module!
				</Text>
			</Box>
		);
	}

	return (
		<RestyledSafeAreaView
			bgColor={module?.color}
			edges={['top', 'left', 'right']}>
			<RestyledScrollView
				style={{ minHeight: '100%' }}
				backgroundColor='background'>
				<Box
					paddingHorizontal='l'
					style={{ backgroundColor: module?.color }}>
					<PageHeaderBack title={title} />
					<Box marginVertical='m'>
						<Text variant='body' numberOfLines={4}>
							{module?.description}
						</Text>
					</Box>
				</Box>
				<Box marginHorizontal='l' height='100%'>
					{module?.content.map((particle, i) => {
						return (
							<ModuleContentItem key={i} particle={particle} />
						);
					})}
				</Box>
			</RestyledScrollView>
		</RestyledSafeAreaView>
	);
}
