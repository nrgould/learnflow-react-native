import {
	createRestyleComponent,
	createVariant,
	spacing,
	SpacingProps,
	VariantProps,
} from '@shopify/restyle';
import React from 'react';
import Theme from '../../theme/theme';
import Box from './Box';

type Props = SpacingProps<typeof Theme> &
	VariantProps<typeof Theme, 'cardVariants'>;
const Card = createRestyleComponent<
	Props & React.ComponentProps<typeof Box>,
	typeof Theme
>([spacing, createVariant({ themeKey: 'cardVariants' })]);

export default Card;
