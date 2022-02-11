import React from 'react';
import { Switch } from 'react-native-gesture-handler';
import Box from '../components/atoms/Box';
import Button from '../components/atoms/Button';
import Card from '../components/atoms/Card';
import Text from '../components/atoms/Text';

interface Props {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Feed({ darkMode, setDarkMode }: Props) {
	return (
		<Box
			height='100%'
			backgroundColor='background'
			flex={1}
			alignItems='center'
			justifyContent='center'>
			<Card variant='primary'>
				<Text variant='body'>
					Open up App.tsx to start working on your app!
				</Text>
				<Button
					label='Set Dark Mode'
					variant='primary'
					onPress={() => setDarkMode(true)}
				/>
				<Button
					label='Set Light Mode'
					variant='secondary'
					onPress={() => setDarkMode(false)}
				/>
				<Switch value={darkMode} onValueChange={setDarkMode} />
			</Card>
		</Box>
	);
}
