import React, { useEffect } from 'react';
import { Switch } from 'react-native-gesture-handler';
import Box from '../components/atoms/Box';
import Button from '../components/atoms/Button';
import Card from '../components/atoms/Card';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import Text from '../components/atoms/Text';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useItemHeight } from '../hooks/useItemHeight';
import { signOut } from '../store/authSlice';
import { clearCurrentUser, fetchCurrentUserAsync } from '../store/profileSlice';
import { setDark, setLight } from '../store/themeSlice';

export default function Profile() {
	const dispatch = useAppDispatch();
	const darkMode = useAppSelector((state) => state.theme.darkMode);
	const itemHeight = useItemHeight();
	const profile = useAppSelector((state) => state.profile.currentUser);
	const userId = useAppSelector((state) => state.auth.userId);
	const status = useAppSelector((state) => state.profile.status);

	console.log(profile);

	useEffect(() => {
		dispatch(fetchCurrentUserAsync(userId!));

		return () => {
			dispatch(clearCurrentUser());
		};
	}, [dispatch]);

	function handleSetDarkMode() {
		if (darkMode) {
			dispatch(setLight());
		} else {
			dispatch(setDark());
		}
	}

	if (status === 'loading') {
		return (
			<Box
				backgroundColor='background'
				flex={1}
				alignItems='center'
				justifyContent='center'>
				<Text variant='subheader'>Loading...</Text>
			</Box>
		);
	}

	return (
		<RestyledSafeAreaView>
			<Box
				height={itemHeight}
				marginTop='s'
				marginHorizontal='l'
				backgroundColor='background'>
				<Card
					height={itemHeight * 0.2}
					variant='primary'
					marginBottom='m'>
					<Text variant='subheader' marginBottom='s'>
						{profile?.displayName}
					</Text>
					<Text variant='body' marginBottom='s'>
						{profile?.email}
					</Text>
					<Text
						variant='body'
						color='primary'
						fontFamily='poppins-semibold'
						marginBottom='s'>
						Study Karma: {profile?.karma}
					</Text>
				</Card>
				<Card
					height={itemHeight * 0.5}
					variant='primary'
					marginBottom='m'>
					<Text variant='subheader' marginBottom='s'>
						Set Dark Mode
					</Text>
					<Switch
						value={darkMode}
						onValueChange={handleSetDarkMode}
					/>
				</Card>
				<Button label='Sign Out' onPress={() => dispatch(signOut())} />
			</Box>
		</RestyledSafeAreaView>
	);
}
