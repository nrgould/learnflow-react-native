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
import PathModulePlaceholder from '../components/Placeholders/PathModulePlaceholder';
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

	const LoadingPlaceholder = () => (
		<RestyledSafeAreaView edges={['right', 'top', 'left']}>
			<Box height='100%' backgroundColor='background'>
				<Box marginTop='s' marginHorizontal='l'>
					<Text variant='header'>My Learning</Text>
					<PathModulePlaceholder />
					<PathModulePlaceholder />
					<PathModulePlaceholder />
					<PathModulePlaceholder />
				</Box>
			</Box>
		</RestyledSafeAreaView>
	);

	if (status === 'loading') {
		return <LoadingPlaceholder />;
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
