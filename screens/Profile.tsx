import React from 'react';
import { Switch } from 'react-native-gesture-handler';
import Box from '../components/atoms/Box';
import Button from '../components/atoms/Button';
import Card from '../components/atoms/Card';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import Text from '../components/atoms/Text';
import { signOutFirebase } from '../firestore/authService';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useItemHeight } from '../hooks/useItemHeight';
import { setDark, setLight } from '../store/themeSlice';

export default function Profile() {
	const dispatch = useAppDispatch();
	const darkMode = useAppSelector((state) => state.theme.darkMode);
	const itemHeight = useItemHeight();

	function handleSetDarkMode() {
		if (darkMode) {
			dispatch(setLight());
		} else {
			dispatch(setDark());
		}
	}

	return (
		<RestyledSafeAreaView>
			<Box
				height={itemHeight}
				marginTop='s'
				alignContent='center'
				justifyContent='space-around'
				marginHorizontal='l'
				backgroundColor='background'>
				<Card variant='primary'>
					<Text variant='subheader' marginBottom='s'>
						Set Dark Mode
					</Text>
					<Switch
						value={darkMode}
						onValueChange={handleSetDarkMode}
					/>
				</Card>
				<Button label='Sign Out' onPress={signOutFirebase} />
			</Box>
		</RestyledSafeAreaView>
	);
}
