import {
	createRestyleComponent,
	createVariant,
	spacing,
	SpacingProps,
	useRestyle,
	VariantProps,
} from '@shopify/restyle';
import React from 'react';
import Animated from 'react-native-reanimated';
import Theme from '../../theme/theme';
import Box from './Box';

const cardVariant = createVariant({ themeKey: 'cardVariants' });

type Props = SpacingProps<typeof Theme> &
	VariantProps<typeof Theme, 'cardVariants'> & {
		children: any;
		style?: object;
	};

const CardComponent = createRestyleComponent<
	Props &
		React.ComponentProps<typeof Animated.View> &
		React.ComponentProps<typeof Box>,
	typeof Theme
>([spacing, cardVariant]);

const restyleFunctions = [cardVariant as any, spacing];

export default function Card({ children, style, variant, ...rest }: Props) {
	const props = useRestyle(restyleFunctions, { ...rest, variant });
	return (
		<CardComponent {...props} style={style} variant={variant}>
			{children}
		</CardComponent>
	);
}
