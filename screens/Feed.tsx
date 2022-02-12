import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Box from '../components/atoms/Box';
import * as Haptics from 'expo-haptics';
import FeedItem from '../components/organisms/FeedItem';
import { useItemHeight } from '../hooks/useItemHeight';
import { StatusBar } from 'expo-status-bar';

interface Props {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Feed(props: Props) {
	const height = useItemHeight();
	return (
		<Box backgroundColor='background'>
			<StatusBar style={'light'} />
			<ScrollView
				snapToAlignment='center'
				onScrollEndDrag={() =>
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
				}
				decelerationRate='fast'
				snapToInterval={height}>
				<FeedItem />
				<FeedItem />
				<FeedItem />
				<FeedItem />
			</ScrollView>
		</Box>
	);
}
