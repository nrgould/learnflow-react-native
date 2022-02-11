import React from 'react';
import { useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Box from '../components/atoms/Box';
import FeedItem from '../components/molecules/FeedItem';
import FeedItemQuestion from '../components/molecules/FeedItemQuestion';
import * as Haptics from 'expo-haptics';

interface Props {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Feed(props: Props) {
	const { height } = useWindowDimensions();
	return (
		<Box backgroundColor='background'>
			<ScrollView
				snapToAlignment='center'
				onScrollEndDrag={() =>
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
				}
				decelerationRate='fast'
				snapToInterval={height - 75}>
				<FeedItem />
				<FeedItemQuestion />
				<FeedItem />
				<FeedItemQuestion />
				<FeedItem />
				<FeedItemQuestion />
				<FeedItem />
				<FeedItemQuestion />
				<FeedItem />
				<FeedItemQuestion />
			</ScrollView>
		</Box>
	);
}
