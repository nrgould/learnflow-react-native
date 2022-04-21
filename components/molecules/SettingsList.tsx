import React from 'react';
import Box from '../atoms/Box';
import SettingsComponent from '../atoms/SettingsComponent';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { signOut } from '../../store/authSlice';

interface Props {
	darkMode: boolean;
	handleSetDarkMode: () => void;
}

export default function SettingsList({ darkMode, handleSetDarkMode }: Props) {
	const navigation = useNavigation<any>();
	const dispatch = useAppDispatch();
	return (
		<Box marginHorizontal='m' marginTop={'l'}>
			<SettingsComponent
				onPress={() => navigation.navigate('UploadContent')}
				name='film-outline'
				label='Upload Video'
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
	);
}
