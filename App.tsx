import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from '@shopify/restyle';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import Box from './components/atoms/Box';
import Text from './components/atoms/Text';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { setDarkMode } from './store/actions/theme';
import { store } from './store/store';
import theme, { darkTheme } from './theme/theme';

const BottomTabs = createBottomTabNavigator();

export default function App() {
	const darkMode = useAppSelector((state) => state.theme.darkMode);
	const dispatch = useAppDispatch();

	function handleSetDarkMode() {
		dispatch(setDarkMode(!darkMode));
	}
	return (
		<Provider store={store}>
			<ThemeProvider theme={darkMode ? darkTheme : theme}>
				<Box height={600} marginBottom='l'>
					<Text>Open up App.tsx to start working on your app!</Text>
					<Switch
						value={darkMode}
						onValueChange={handleSetDarkMode}
					/>
				</Box>
			</ThemeProvider>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
