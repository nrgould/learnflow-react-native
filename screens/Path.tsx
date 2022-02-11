import React from 'react';
import Box from '../components/atoms/Box';
import Card from '../components/atoms/Card';
import Text from '../components/atoms/Text';

export default function Path() {
	return (
		<Box height='100%' backgroundColor='background'>
			<Box marginTop='xxl' marginHorizontal='l'>
				<Text variant='header'>My Learning</Text>
				<Card width='100%' variant='primary' marginVertical='s'>
					<Text variant='cardHeader'>Algebra</Text>
					<Box
						alignItems='flex-start'
						justifyContent='center'
						marginTop='m'>
						<Text variant='body'>97 / 212 Fragments</Text>
						<Text variant='body'>45% Complete</Text>
					</Box>
				</Card>
			</Box>
		</Box>
	);
}
