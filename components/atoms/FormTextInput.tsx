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
} from "@shopify/restyle";
import React from "react";
import Box from "./Box";
import Theme from "../../theme/theme";
import Text from "./Text";
import { TextInput } from "react-native-gesture-handler";

const inputVariant = createVariant({ themeKey: "inputVariants" });

const TextInputComponent = createRestyleComponent<
  SpacingProps<typeof Theme> &
    BorderProps<typeof Theme> &
    VariantProps<typeof Theme, "inputVariants"> &
    React.ComponentProps<typeof TextInput>,
  typeof Theme
>([inputVariant], TextInput);

interface InputProps extends React.ComponentProps<typeof TextInput> {}

type Props = SpacingProps<typeof Theme> &
  VariantProps<typeof Theme, "inputVariants"> &
  BorderProps<typeof Theme> &
  BackgroundColorProps<typeof Theme> &
  InputProps & {
    onChange?: () => void;
    label?: string;
    disabled?: boolean;
    error?: string;
    placeholder?: string;
    variant?: string;
  };

const restyleFunctions = composeRestyleFunctions<typeof Theme, Props>([
  spacing,
  border,
  backgroundColor,
]);

export default function FormTextInput({ ...rest }: Props) {
  const props = useRestyle(restyleFunctions, rest);

  const { label, error, placeholder, onChange } = props;

  return (
    <Box marginVertical='xs'>
      {label && (
        <Text variant='label' color='primaryText'>
          {label}
        </Text>
      )}
      {error && <Text color='error'>{error}</Text>}
      <TextInputComponent {...props} placeholder={placeholder} onChange={onChange} />
    </Box>
  );
}
