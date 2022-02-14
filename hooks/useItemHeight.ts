import { Dimensions, useWindowDimensions } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme/theme';

export function useItemHeight(): number {
	const theme = useTheme<Theme>();
	const { height } = useWindowDimensions();

	const { smallDevice } = theme.breakpoints;
	const { bottomTabHeightLarge, bottomTabHeightSmall } = theme.constants;

	const isSmallDevice = Dimensions.get('window').height < smallDevice;
	const tabBarHeight = isSmallDevice
		? bottomTabHeightSmall
		: bottomTabHeightLarge;

	return height - tabBarHeight;
}
