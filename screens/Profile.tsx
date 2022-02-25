import React from 'react';
import { Switch } from 'react-native-gesture-handler';
import Box from '../components/atoms/Box';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import Text from '../components/atoms/Text';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setDark, setLight } from '../store/themeSlice';

export default function Profile() {
	const dispatch = useAppDispatch();
	const darkMode = useAppSelector((state) => state.theme.darkMode);

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
				height='100%'
				marginTop='s'
				marginHorizontal='l'
				backgroundColor='background'>
				<Text variant='body'>Set Dark Mode</Text>
				<Switch value={darkMode} onValueChange={handleSetDarkMode} />
			</Box>
		</RestyledSafeAreaView>
	);
}
