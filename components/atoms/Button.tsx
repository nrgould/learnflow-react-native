import React, { ReactElement } from "react";
import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  composeRestyleFunctions,
  createRestyleComponent,
  createVariant,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  useRestyle,
  VariantProps,
} from "@shopify/restyle";
import Theme from "../../theme/theme";
import Box from "./Box";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import Text from "./Text";

const buttonVariant = createVariant({ themeKey: "buttonVariants" });

type Props = SpacingProps<typeof Theme> &
  VariantProps<typeof Theme, "buttonVariants"> &
  BorderProps<typeof Theme> &
  LayoutProps<typeof Theme> &
  BackgroundColorProps<typeof Theme> & {
    onPress: () => void;
    label?: string;
    tall?: boolean;
    outline?: boolean;
    loading?: boolean;
    disabled?: boolean;
    style?: object;
    iconRight?: ReactElement;
    iconLeft?: ReactElement;
  };

const ButtonContainer = createRestyleComponent<
  VariantProps<typeof Theme, "buttonVariants"> & React.ComponentProps<typeof Box>,
  typeof Theme
>([buttonVariant], Box);

const restyleFunctions = composeRestyleFunctions([
  buttonVariant as any,
  spacing,
  border,
  layout,
  backgroundColor,
]);

const Button = ({
  onPress,
  tall,
  label,
  disabled,
  loading = false,
  variant = "primary",
  iconRight,
  iconLeft,
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, { ...rest, variant });
  const textVariant = ("button_" + variant) as Partial<
    keyof Omit<typeof Theme["textVariants"], "defaults">
  >;
  let icon;
  if (iconRight || iconLeft) {
    icon = true;
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <ButtonContainer
        variant={disabled ? "disabled" : variant}
        padding={tall ? "sm" : "s"}
        paddingHorizontal={icon ? "s" : "m"}
        marginVertical='s'
        flexDirection='row'
        alignItems='center'
        justifyContent='center'
        {...props}
      >
        {iconLeft}
        {loading ? (
          <ActivityIndicator color='fff' />
        ) : (
          <Text
            variant={textVariant}
            marginHorizontal={icon ? "s" : "none"}
            textAlign='center'
            fontWeight='bold'
          >
            {label}
          </Text>
        )}
        {iconRight}
      </ButtonContainer>
    </TouchableOpacity>
  );
};

export default Button;
