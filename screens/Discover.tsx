import React, { useEffect, useState } from 'react';
import Box from '../components/atoms/Box';
import Text from '../components/atoms/Text';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import Tag from '../components/atoms/Tag';
import DiscoverModule from '../components/molecules/DiscoverModule';
import SearchInput from '../components/atoms/SearchInput';
import RestyledScrollView from '../components/atoms/RestyledScrollView';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Card from '../components/atoms/Card';
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated';
import AnimatedScrollHeader from '../components/molecules/AnimatedScrollHeader';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchModulesAsync } from '../store/moduleSlice';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme/theme';
import Icon from '../components/atoms/Icon';
import { useItemHeight } from '../hooks/useItemHeight';

export default function Discover() {
	const theme = useTheme<Theme>();
	const [searchFocused, setSearchFocused] = useState(false);
	const itemHeight = useItemHeight();

	const { primary, secondary, tertiary } = theme.colors;

	const translateY = useSharedValue(0);

	function handleSearchFocus() {
		setSearchFocused(!searchFocused);
	}

	const scrollHandler = useAnimatedScrollHandler((event) => {
		translateY.value = event.contentOffset.y;
	});

	const AnimatedScrollView =
		Animated.createAnimatedComponent(RestyledScrollView);

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

	if (searchFocused) {
		return (
			<RestyledSafeAreaView>
				<Box
					marginHorizontal='l'
					flex={1}
					flexDirection='row'
					alignItems='center'
					justifyContent='space-between'>
					<TouchableOpacity onPress={() => setSearchFocused(false)}>
						<Ionicons
							name='chevron-back'
							size={24}
							color={'white'}
							style={{ marginRight: 12 }}
						/>
					</TouchableOpacity>
					<SearchInput
						placeholder='What do you want to learn?'
						variant={'search'}
						color='primaryText'
						autoFocus={true}
						searchFocused={true}
					/>
				</Box>
				<RestyledScrollView style={{ height: '100%' }}>
					<Box height='100%' marginHorizontal='l' marginBottom='s'>
						<Card variant='primary'>
							<Text variant='body'>Search Item</Text>
						</Card>
					</Box>
				</RestyledScrollView>
			</RestyledSafeAreaView>
		);
	}

	return (
		<RestyledSafeAreaView edges={['right', 'top', 'left']}>
			<AnimatedScrollHeader translateY={translateY} title='Discover' />
			<AnimatedScrollView
				onScroll={scrollHandler}
				scrollEventThrottle={16}
				style={{ height: itemHeight }}
				marginTop='s'
				backgroundColor='background'>
				<Box marginHorizontal='l' marginBottom='s'>
					<Text variant='header' marginBottom='s'>
						Discover
					</Text>
					<SearchInput
						placeholder='What do you want to learn?'
						variant={'search'}
						style={{ minWidth: '100%' }}
						marginBottom='m'
						searchFocused={searchFocused}
						handleSearchFocus={handleSearchFocus}
					/>
				</Box>
				<Box
					marginHorizontal='l'
					marginVertical='s'
					flexDirection='row'
					flexWrap={'wrap'}>
					<Tag text='Algebra' />
					<Tag text='Calculus I' />
					<Tag text='Astronomy' />
					<Tag text='English' />
					<Tag text='Programming' />
					<Tag text='Java' />
					<Tag text='Python' />
				</Box>
				<Box marginHorizontal='l'>
					<Box
						flexDirection='row'
						marginTop='m'
						alignItems='center'
						justifyContent='flex-start'>
						<Icon
							name='bulb'
							size={24}
							color='secondaryText'
							style={{ marginRight: theme.spacing.s }}
						/>
						<Text
							variant='subheader'
							color='secondaryText'
							fontSize={18}>
							We think you'd like these
						</Text>
					</Box>
					{modules?.map((module, index) => {
						let color: string;
						if (index % 3 === 0) {
							color = primary;
						} else if (index % 3 === 2) {
							color = secondary;
						} else {
							color = tertiary;
						}
						return (
							<DiscoverModule
								color={color}
								key={index}
								module={module}
							/>
						);
					})}
				</Box>
			</AnimatedScrollView>
		</RestyledSafeAreaView>
	);
}
