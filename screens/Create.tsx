import React from 'react';
import Box from '../components/atoms/Box';
import Text from '../components/atoms/Text';
import PageHeaderBack from '../components/molecules/PageHeaderBack';
import Layout from '../Layout';

export default function Create() {
	return (
		<Layout>
			<PageHeaderBack title='Create' />
			<Text variant='body'>create a post</Text>
		</Layout>
	);
}
