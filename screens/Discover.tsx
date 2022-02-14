import React from 'react';
import Box from '../components/atoms/Box';
import Text from '../components/atoms/Text';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import Tag from '../components/atoms/Tag';
import { NavigationTypes } from '../types';
import DiscoverModule from '../components/molecules/DiscoverModule';
import SearchInput from '../components/atoms/SearchInput';
import RestyledScrollView from '../components/atoms/RestyledScrollView';

export default function Discover({ navigation }: NavigationTypes) {
	const SAMPLE_MODULE = {
		title: 'Calculus I',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque illo repellat architecto obcaecati. Itaque laborum aut consequatur nobis sed nam?',
	};

	return (
		<RestyledSafeAreaView edges={['right', 'top', 'left']}>
			<RestyledScrollView
				marginTop='s'
				height='100%'
				backgroundColor='background'>
				<Box marginHorizontal='l' marginBottom='s'>
					<Text variant='header'>Discover</Text>
					<SearchInput
						placeholder='What do you want to learn?'
						variant={'search'}
						style={{ minWidth: '100%' }}
						marginBottom='m'
					/>
				</Box>
				<Box marginHorizontal='l' flexDirection='row' flexWrap={'wrap'}>
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
				</Box>
			</RestyledScrollView>
		</RestyledSafeAreaView>
	);
}
