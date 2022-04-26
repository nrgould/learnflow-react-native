import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { ReactElement, useState } from 'react';
import { useAppSelector } from '../hooks/reduxHooks';

interface LoadAssetsProps {
	fonts?: any;
	assets?: number[];
	children: ReactElement | ReactElement[];
}

const LoadAssets = ({ fonts, children }: LoadAssetsProps) => {
	const [dataLoaded, setDataLoaded] = useState(false);
	const authenticated = useAppSelector((state) => state.auth.authenticated);

	const fetchData = async () => {
		if (authenticated) {
			console.log('user logged in');
			// dispatch(fetchFeedAsync(user.uid));
		} else {
			console.log('no user');
		}
		return Font.loadAsync(fonts);
	};

	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchData}
				onFinish={() => setDataLoaded(true)}
				onError={(error: any) => {
					console.log(error);
					throw error;
				}}
			/>
		);
	}
	return <NavigationContainer>{children}</NavigationContainer>;
};

export default LoadAssets;
