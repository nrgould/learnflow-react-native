import { useTheme } from '@shopify/restyle';
import React, { useEffect } from 'react';
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated';
import Box from '../components/atoms/Box';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import RestyledScrollView from '../components/atoms/RestyledScrollView';
import Text from '../components/atoms/Text';
import AnimatedScrollHeader from '../components/molecules/AnimatedScrollHeader';
import PathModule from '../components/molecules/PathModule';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchModulesAsync } from '../store/moduleSlice';
import { Theme } from '../theme/theme';
import { NavigationTypes } from '../types';

const AnimatedScrollView = Animated.createAnimatedComponent(RestyledScrollView);

interface Props extends NavigationTypes {}

export default function Path({ navigation }: Props) {
	const theme = useTheme<Theme>();
	const { primary, secondary, tertiary } = theme.colors;
	const modules = useAppSelector((state) => state.module.modules);
	const status = useAppSelector((state) => state.module.status);

	const dispatch = useAppDispatch();

	const translateY = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler((event) => {
		translateY.value = event.contentOffset.y;
	});

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
		<RestyledSafeAreaView edges={['right', 'top', 'left']}>
			<AnimatedScrollHeader title='My Learning' translateY={translateY} />
			<AnimatedScrollView
				onScroll={scrollHandler}
				scrollEventThrottle={16}
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
									key={i}
								/>
							);
						})}
					</Box>
				</Box>
			</AnimatedScrollView>
		</RestyledSafeAreaView>
	);
}
