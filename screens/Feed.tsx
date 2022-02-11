import React from 'react';
import { useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FeedItem from '../components/molecules/FeedItem';

interface Props {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Feed() {
	const { height } = useWindowDimensions();
	return (
		<ScrollView
			snapToAlignment='start'
			decelerationRate='fast'
			snapToInterval={height - 80}>
			<FeedItem />
			<FeedItem />
			<FeedItem />
			<FeedItem />
			<FeedItem />
			<FeedItem />
			<FeedItem />
			<FeedItem />
			<FeedItem />
		</ScrollView>
	);
}
