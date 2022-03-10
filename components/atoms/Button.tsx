import React from 'react';
import {
	backgroundColor,
	BackgroundColorProps,
	border,
	BorderProps,
	composeRestyleFunctions,
	createRestyleComponent,
	createVariant,
	spacing,
	SpacingProps,
	useRestyle,
	VariantProps,
} from '@shopify/restyle';
import Theme from '../../theme/theme';
import Box from './Box';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import Text from './Text';

const buttonVariant = createVariant({ themeKey: 'buttonVariants' });

type Props = SpacingProps<typeof Theme> &
	VariantProps<typeof Theme, 'buttonVariants'> &
	BorderProps<typeof Theme> &
	BackgroundColorProps<typeof Theme> & {
		onPress: () => void;
		label?: string;
		outline?: boolean;
		loading?: boolean;
		disabled?: boolean;
	};

const ButtonContainer = createRestyleComponent<
	VariantProps<typeof Theme, 'buttonVariants'> &
		React.ComponentProps<typeof Box>,
	typeof Theme
>([buttonVariant], Box);

const restyleFunctions = composeRestyleFunctions([
	buttonVariant as any,
	spacing,
	border,
	backgroundColor,
]);

const Button = ({
	onPress,
	label,
	disabled,
	loading = false,
	variant = 'primary',
	...rest
}: Props) => {
	const props = useRestyle(restyleFunctions, { ...rest, variant });
	const textVariant = ('button_' + variant) as Partial<
		keyof Omit<typeof Theme['textVariants'], 'defaults'>
	>;
	return (
		<TouchableOpacity onPress={onPress}>
			<ButtonContainer
				variant={disabled ? 'disabled' : variant}
				padding='s'
				paddingHorizontal='m'
				marginVertical='s'
				{...props}>
				{loading ? (
					<ActivityIndicator color='fff' />
				) : (
					<Text
						variant={textVariant}
						textAlign='center'
						fontWeight='bold'>
						{label}
					</Text>
				)}
			</ButtonContainer>
		</TouchableOpacity>
	);
};

export default Button;
