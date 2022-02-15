import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Layout from './Layout';

const fetchFonts = () => {
	return Font.loadAsync({
		'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
		'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
		'poppins-semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),
		'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
	});
};

export default function App() {
	const [dataLoaded, setDataLoaded] = useState(false);

	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
				onError={(error: any) => console.log(error)}
			/>
		);
	}

	return (
		<Provider store={store}>
			<Layout />
		</Provider>
	);
}
