import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { Switch } from 'react-native-gesture-handler';
import Box from '../../components/atoms/Box';
import Card from '../../components/atoms/Card';
import RestyledSafeAreaView from '../../components/atoms/RestyledSafeAreaView';
import Text from '../../components/atoms/Text';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useItemHeight } from '../../hooks/useItemHeight';
import { signOut } from '../../store/authSlice';
import {
	clearCurrentUser,
	fetchCurrentUserAsync,
} from '../../store/profileSlice';
import { setDark, setLight } from '../../store/themeSlice';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/theme';
import Icon from '../../components/atoms/Icon';
import SettingsComponent from '../../components/molecules/SettingsComponent';
import { NavigationTypes } from '../../types';

export default function Profile({ navigation }: NavigationTypes) {
	const [bottomSheetActive, setBottomSheetActive] = useState(false);
	const dispatch = useAppDispatch();
	const darkMode = useAppSelector((state) => state.theme.darkMode);
	const itemHeight = useItemHeight();
	const profile = useAppSelector((state) => state.profile.currentUser);
	const userId = useAppSelector((state) => state.auth.userId);
	const status = useAppSelector((state) => state.profile.status);
	const theme = useTheme<Theme>();
	const { foreground, bottomSheetBackground, activeIcon } = theme.colors;

	const bottomSheetRef = useRef<BottomSheet>(null);

	const snapPoints = useMemo(() => ['50%', '75%'], []);

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
		if (index === -1) {
			setBottomSheetActive(false);
		}
	}, []);

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
				marginHorizontal='m'
				backgroundColor='background'>
				<Box
					flexDirection='row'
					width='100%'
					alignItems='center'
					justifyContent='flex-end'>
					<Icon
						onPress={() => setBottomSheetActive(!bottomSheetActive)}
						name='cog-outline'
						color={activeIcon}
						size={32}
					/>
				</Box>
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
					marginBottom='m'></Card>
			</Box>
			<BottomSheet
				ref={bottomSheetRef}
				handleIndicatorStyle={{ backgroundColor: foreground }}
				handleStyle={{
					paddingVertical: 16,
				}}
				style={{ zIndex: 10 }}
				backgroundStyle={{
					backgroundColor: bottomSheetBackground,
				}}
				index={bottomSheetActive ? 1 : -1}
				snapPoints={snapPoints}
				enablePanDownToClose
				onChange={handleSheetChanges}>
				<Box marginHorizontal='m' marginTop={'l'}>
					<SettingsComponent
						onPress={() => console.log(' view saved')}
						name='bookmark-outline'
						label='Saved'
					/>
					<SettingsComponent
						onPress={() => navigation.navigate('Account')}
						name='person-circle-outline'
						label='Account'
					/>
					<SettingsComponent
						name='moon-outline'
						label='Dark Mode'
						switchAction={handleSetDarkMode}
						switchValue={darkMode}
					/>
					<SettingsComponent
						onPress={() => console.log('view help')}
						name='help-buoy-sharp'
						label='Help'
					/>
					<SettingsComponent
						onPress={() => dispatch(signOut())}
						name='log-out-outline'
						label='Sign Out'
					/>
				</Box>
			</BottomSheet>
		</RestyledSafeAreaView>
	);
}
