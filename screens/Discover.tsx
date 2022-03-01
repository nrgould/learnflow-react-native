import React, { useState } from 'react';
import Box from '../components/atoms/Box';
import Text from '../components/atoms/Text';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import Tag from '../components/atoms/Tag';
import { NavigationTypes } from '../types';
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
import { useItemHeight } from '../hooks/useItemHeight';

const SAMPLE_MODULE = {
	title: 'Calculus I',
	description:
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque illo repellat architecto obcaecati. Itaque laborum aut consequatur nobis sed nam?',
};

export default function Discover({ navigation }: NavigationTypes) {
	const [searchFocused, setSearchFocused] = useState(false);
	const itemHeight = useItemHeight();

	const translateY = useSharedValue(0);

	function handleSearchFocus() {
		setSearchFocused(!searchFocused);
	}

	const scrollHandler = useAnimatedScrollHandler((event) => {
		translateY.value = event.contentOffset.y;
	});

	const AnimatedScrollView =
		Animated.createAnimatedComponent(RestyledScrollView);

	if (searchFocused) {
		return (
			<RestyledSafeAreaView>
				<Box
					marginHorizontal='l'
					marginBottom='s'
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
				marginTop='s'
				style={{ minHeight: itemHeight }}
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
					<Tag navigation={navigation} text='Algebra' />
					<Tag navigation={navigation} text='Calculus I' />
					<Tag navigation={navigation} text='Astronomy' />
					<Tag navigation={navigation} text='English' />
					<Tag navigation={navigation} text='Programming' />
					<Tag navigation={navigation} text='Java' />
					<Tag navigation={navigation} text='Python' />
				</Box>
				<Box marginHorizontal='l'>
					<DiscoverModule
						module={SAMPLE_MODULE}
						navigation={navigation}
					/>
					<DiscoverModule
						module={SAMPLE_MODULE}
						navigation={navigation}
					/>
					<DiscoverModule
						module={SAMPLE_MODULE}
						navigation={navigation}
					/>
					<DiscoverModule
						module={SAMPLE_MODULE}
						navigation={navigation}
					/>
					<DiscoverModule
						module={SAMPLE_MODULE}
						navigation={navigation}
					/>
				</Box>
			</AnimatedScrollView>
		</RestyledSafeAreaView>
	);
}
