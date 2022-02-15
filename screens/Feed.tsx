import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Box from '../components/atoms/Box';
import * as Haptics from 'expo-haptics';
import FeedItem from '../components/organisms/FeedItem';
import { useItemHeight } from '../hooks/useItemHeight';
import { StatusBar } from 'expo-status-bar';
import { NavigationTypes } from '../types';

export default function Feed({ navigation }: NavigationTypes) {
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
				<FeedItem navigation={navigation} />
				<FeedItem navigation={navigation} />
				<FeedItem navigation={navigation} />
				<FeedItem navigation={navigation} />
			</ScrollView>
		</Box>
	);
}
