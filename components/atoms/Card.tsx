import {
	BorderProps,
	createRestyleComponent,
	createVariant,
	LayoutProps,
	layout,
	spacing,
	border,
	SpacingProps,
	VariantProps,
} from '@shopify/restyle';
import { View } from 'react-native';
import Theme from '../../theme/theme';

const cardVariant = createVariant({ themeKey: 'cardVariants' });

type Props = SpacingProps<typeof Theme> &
	BorderProps<typeof Theme> &
	LayoutProps<typeof Theme> &
	VariantProps<typeof Theme, 'cardVariants'> &
	React.ComponentProps<typeof View> & {
		children?: any;
		style?: object;
	};

const Card = createRestyleComponent<Props, typeof Theme>([
	spacing,
	layout,
	border,
	cardVariant,
]);

export default Card;
