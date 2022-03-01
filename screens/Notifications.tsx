import React from 'react';
import { Dimensions } from 'react-native';
import Box from '../components/atoms/Box';
import Card from '../components/atoms/Card';
import Text from '../components/atoms/Text';
import QuestionBox from '../components/molecules/QuestionBox';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Notifications() {
	return (
		<Box height='100%' backgroundColor='background'>
			<Box marginTop='xxl' marginHorizontal='l'>
				<Text variant='header'>Notifications</Text>
				<Box
					borderColor='border'
					borderWidth={1}
					height={SCREEN_HEIGHT * 0.3}
					alignItems='center'
					justifyContent='center'>
					<Text variant='cardHeader'>
						x^2 + 6x + 9 = (x + 3) times what?
					</Text>
					<Card
						width={SCREEN_WIDTH / 3.5}
						variant='answerBox'
						justifyContent={'center'}
						alignItems='center'
						height={60}
						onLayout={({ nativeEvent }) => {
							console.log(nativeEvent);
						}}>
						<Text variant='body' color='border' fontSize={14}>
							Place here
						</Text>
					</Card>
				</Box>
				<Box
					height={SCREEN_HEIGHT * 0.5}
					borderColor='border'
					borderWidth={1}
					alignItems='flex-end'
					flexDirection='row'
					justifyContent='center'
					flexWrap='wrap'>
					<QuestionBox isAnswer={true} content='(X - 3)' />
					<QuestionBox isAnswer={false} content='(X + 3)' />
					<QuestionBox isAnswer={false} content='(X - 6)' />
					<QuestionBox isAnswer={false} content='(X + 6)' />
				</Box>
			</Box>
		</Box>
	);
}
