import React from 'react';
import FeedItemQuestion from '../molecules/FeedItemQuestion';
import FeedItemContent from '../molecules/FeedItemContent';

export default function FeedItem() {
	return (
		<React.Fragment>
			<FeedItemContent />
			<FeedItemQuestion />
		</React.Fragment>
	);
}
