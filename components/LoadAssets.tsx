import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { ReactElement, useState } from 'react';
import { useAppDispatch } from '../hooks/reduxHooks';
import { fetchFeedAsync } from '../store/feedSlice';

interface LoadAssetsProps {
	fonts?: any;
	assets?: number[];
	children: ReactElement | ReactElement[];
}

const LoadAssets = ({ fonts, children }: LoadAssetsProps) => {
	const [dataLoaded, setDataLoaded] = useState(false);
	const dispatch = useAppDispatch();

	const fetchData = async () => {
		await dispatch(fetchFeedAsync());
		return Font.loadAsync(fonts);
	};

	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchData}
				onFinish={() => setDataLoaded(true)}
				onError={(error: any) => console.log(error)}
			/>
		);
	}
	return <NavigationContainer>{children}</NavigationContainer>;
};

export default LoadAssets;
