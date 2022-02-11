import {
	backgroundColor,
	BackgroundColorProps,
	border,
	BorderProps,
	createRestyleComponent,
	createVariant,
	spacing,
	SpacingProps,
	useRestyle,
	useTheme,
	VariantProps,
} from '@shopify/restyle';
import React from 'react';
import Box from './Box';
import Theme from '../../theme/theme';
import Text from './Text';
import { TextInput } from 'react-native-gesture-handler';

const inputVariant = createVariant({ themeKey: 'inputVariants' });

const TextInputComponent = createRestyleComponent<
	SpacingProps<typeof Theme> &
		BorderProps<typeof Theme> &
		VariantProps<typeof Theme, 'inputVariants'> &
		React.ComponentProps<typeof TextInput>,
	typeof Theme
>([inputVariant], TextInput);

interface InputProps extends React.ComponentProps<typeof TextInput> {}

type Props = SpacingProps<typeof Theme> &
	VariantProps<typeof Theme, 'inputVariants'> &
	BorderProps<typeof Theme> &
	BackgroundColorProps<typeof Theme> &
	InputProps & {
		onChange?: () => void;
		label?: string;
		// name?: string;
		disabled?: boolean;
		error?: string;
		placeholder?: string;
		variant?: string;
	};

const restyleFunctions = [spacing, border, backgroundColor];

export default function FormTextInput({
	label,
	disabled,
	error,
	value,
	placeholder,
	onChange,
	// textContentType = 'none',
	// autoCorrect = false,
	variant = 'primary',
	...rest
}: Props) {
	const props = useRestyle(restyleFunctions, { ...rest });
	const theme = useTheme<typeof Theme>();

	return (
		<Box marginVertical='m'>
			{label && (
				<Text fontFamily={'poppins-regular'} color='primaryText'>
					{label}
				</Text>
			)}
			{error && (
				<Text fontWeight='500' color='error'>
					{error}
				</Text>
			)}
			<TextInputComponent
				{...props}
				placeholderTextColor={theme.colors.secondaryText}
				variant={variant}
				placeholder={placeholder}
				onChange={onChange}
				returnKeyType='done'
			/>
		</Box>
	);
}
