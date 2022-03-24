import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './Layout';
import LoadAssets from './components/LoadAssets';

const fonts = {
	'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
	'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
	'poppins-semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),
	'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
	'sora-regular': require('./assets/fonts/Sora-Regular.ttf'),
	'sora-medium': require('./assets/fonts/Sora-Medium.ttf'),
	'sora-semibold': require('./assets/fonts/Sora-SemiBold.ttf'),
	'sora-bold': require('./assets/fonts/Sora-Bold.ttf'),

};

export default function App() {
	return (
		<Provider store={store}>
			<LoadAssets fonts={fonts}>
				<Layout />
			</LoadAssets>
		</Provider>
	);
}
