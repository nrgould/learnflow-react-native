import {
	backgroundColor,
	BackgroundColorProps,
	border,
	color,
	ColorProps,
	BorderProps,
	createRestyleComponent,
	createVariant,
	spacing,
	SpacingProps,
	useRestyle,
	useTheme,
	VariantProps,
	composeRestyleFunctions,
} from '@shopify/restyle';
import React from 'react';
import Box from './Box';
import Theme from '../../theme/theme';
import { TextInput } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const inputVariant = createVariant({ themeKey: 'inputVariants' });

const TextInputComponent = createRestyleComponent<
	SpacingProps<typeof Theme> &
		BorderProps<typeof Theme> &
		ColorProps<typeof Theme> &
		VariantProps<typeof Theme, 'inputVariants'> &
		React.ComponentProps<typeof TextInput>,
	typeof Theme
>([inputVariant], TextInput);

const ContainerComponent = createRestyleComponent<
	SpacingProps<typeof Theme> &
		BorderProps<typeof Theme> &
		ColorProps<typeof Theme> &
		VariantProps<typeof Theme, 'inputVariants'> &
		React.ComponentProps<typeof Box>,
	typeof Theme
>([inputVariant], Box);

interface InputProps extends React.ComponentProps<typeof TextInput> {}

type Props = SpacingProps<typeof Theme> &
	VariantProps<typeof Theme, 'inputVariants'> &
	BorderProps<typeof Theme> &
	ColorProps<typeof Theme> &
	BackgroundColorProps<typeof Theme> &
	InputProps & {
		onChange?: () => void;
		disabled?: boolean;
		error?: string;
		placeholder?: string;
		variant?: string;
		autoFocus?: boolean;
		searchFocused?: boolean;
		handleSearchFocus?: () => void;
	};

const restyleFunctions = composeRestyleFunctions([
	color,
	spacing,
	border,
	backgroundColor,
]);

export default function SearchInput({
	disabled,
	error,
	value,
	placeholder,
	onChange,
	searchFocused,
	handleSearchFocus,
	autoFocus,
	variant = 'primary',
	...rest
}: Props) {
	const props = useRestyle(restyleFunctions, rest);
	const theme = useTheme<typeof Theme>();

	return (
		<ContainerComponent
			variant={variant}
			style={{ ...styles.container, width: '100%', flex: 1 }}>
			<TextInputComponent
				{...props}
				placeholderTextColor={theme.colors.secondaryText}
				placeholder={placeholder}
				onChange={onChange}
				returnKeyType='done'
				autoFocus={autoFocus}
				onFocus={handleSearchFocus}
				style={styles.input}
			/>
			<Ionicons
				size={24}
				name={searchFocused ? 'search' : 'search-outline'}
				color={theme.colors.secondaryText}
			/>
		</ContainerComponent>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	input: {
		flex: 1,
	},
});
