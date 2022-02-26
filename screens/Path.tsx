import { useTheme } from '@shopify/restyle';
import React, { useEffect } from 'react';
import Box from '../components/atoms/Box';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import RestyledScrollView from '../components/atoms/RestyledScrollView';
import Text from '../components/atoms/Text';
import PathModule from '../components/molecules/PathModule';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchModulesAsync } from '../store/moduleSlice';
import { Theme } from '../theme/theme';
import { NavigationTypes } from '../types';

interface Props extends NavigationTypes {}

export default function Path({ navigation }: Props) {
	const theme = useTheme<Theme>();
	const { primary, secondary, tertiary } = theme.colors;
	const modules = useAppSelector((state) => state.module.modules);
	const status = useAppSelector((state) => state.module.status);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchModulesAsync());
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
		<RestyledSafeAreaView>
			<RestyledScrollView
				style={{ minHeight: '100%' }}
				backgroundColor='background'>
				<Box height='100%' backgroundColor='background'>
					<Box marginTop='s' marginHorizontal='l'>
						<Text variant='header'>My Learning</Text>
						{modules?.map((module, i) => {
							let progressColor: string;
							if (i % 3 === 0) {
								progressColor = primary;
							} else if (i % 3 === 2) {
								progressColor = secondary;
							} else {
								progressColor = tertiary;
							}
							return (
								<PathModule
									progressColor={progressColor}
									navigation={navigation}
									module={module}
								/>
							);
						})}

						{/* <PathModule
							completedContent={73}
							totalContent={135}
							progressColor={secondary}
							navigation={navigation}
						/>
						<PathModule
							completedContent={87}
							totalContent={112}
							progressColor={tertiary}
							navigation={navigation}
						/> */}
					</Box>
				</Box>
			</RestyledScrollView>
		</RestyledSafeAreaView>
	);
}
