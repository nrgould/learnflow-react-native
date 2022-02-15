import React from 'react';
import FeedItemQuestion from '../molecules/FeedItemQuestion';
import FeedItemContent from '../molecules/FeedItemContent';
import { NavigationTypes } from '../../types';

interface Props extends NavigationTypes {}

export default function FeedItem({ navigation }: Props) {
	return (
		<React.Fragment>
			<FeedItemContent navigation={navigation} />
			<FeedItemQuestion />
		</React.Fragment>
	);
}
