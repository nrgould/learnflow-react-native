import React, { useEffect, useState } from 'react';
import Box from '../components/atoms/Box';
import Text from '../components/atoms/Text';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import DiscoverCourseItem from '../components/molecules/DiscoverCourseItem';
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
import { fetchCoursesAsync } from '../store/courseSlice';
import { useItemHeight } from '../hooks/useItemHeight';

export default function Discover() {
	const [searchFocused, setSearchFocused] = useState(false);
	const itemHeight = useItemHeight();
	const courses = useAppSelector((state) => state.course.courses);
	const status = useAppSelector((state) => state.course.status);
	const dispatch = useAppDispatch();

	const algebraCourses = courses?.filter(
		(course) => course.category === 'algebra'
	);

	const calculusCourses = courses?.filter(
		(course) => course.category === 'calculus'
	);

	const translateY = useSharedValue(0);

	function handleSearchFocus() {
		setSearchFocused(!searchFocused);
	}

	const scrollHandler = useAnimatedScrollHandler((event) => {
		translateY.value = event.contentOffset.y;
	});

	const AnimatedScrollView =
		Animated.createAnimatedComponent(RestyledScrollView);

	useEffect(() => {
		dispatch(fetchCoursesAsync());
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
					{/* <SearchInput
						placeholder='What do you want to learn?'
						variant='search'
						style={{ minWidth: '100%' }}
						marginBottom='m'
						searchFocused={searchFocused}
						handleSearchFocus={handleSearchFocus}
					/> */}
				</Box>
				<Box margin='l'>
					<Text variant='cardHeader'>Algebra</Text>
					<AnimatedScrollView
						onScroll={scrollHandler}
						horizontal
						backgroundColor='background'>
						{algebraCourses?.map((course, index) => {
							return (
								<DiscoverCourseItem
									key={index}
									course={course}
								/>
							);
						})}
					</AnimatedScrollView>
				</Box>
				<Box margin='l'>
					<Text variant='cardHeader'>Calculus</Text>
					<AnimatedScrollView
						onScroll={scrollHandler}
						scrollEventThrottle={16}
						horizontal
						backgroundColor='background'>
						{calculusCourses?.map((course, index) => {
							return (
								<DiscoverCourseItem
									key={index}
									course={course}
								/>
							);
						})}
					</AnimatedScrollView>
				</Box>
			</AnimatedScrollView>
		</RestyledSafeAreaView>
	);
}
