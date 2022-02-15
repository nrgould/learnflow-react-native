import {
	createRestyleComponent,
	spacing,
	SpacingProps,
	backgroundColor,
	BackgroundColorProps,
} from '@shopify/restyle';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Theme from '../../theme/theme';

type Props = SpacingProps<typeof Theme> & BackgroundColorProps<typeof Theme>;

const RestyledScrollView = createRestyleComponent<
	Props & React.ComponentProps<typeof ScrollView>,
	typeof Theme
>([spacing, backgroundColor], ScrollView);

export default RestyledScrollView;
