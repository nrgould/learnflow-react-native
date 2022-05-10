import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  color,
  ColorProps,
  composeRestyleFunctions,
  createVariant,
  spacing,
  SpacingProps,
  useRestyle,
  VariantProps,
} from "@shopify/restyle";
import React, { useState } from "react";
import Box from "./Box";
import Theme from "../../theme/theme";
import Text from "./Text";
import Icon from "./Icon";
import { TouchableOpacity } from "react-native";
import RestyledScrollView from "./RestyledScrollView";

const inputVariant = createVariant({ themeKey: "inputVariants" });

type Props = SpacingProps<typeof Theme> &
  VariantProps<typeof Theme, "inputVariants"> &
  BorderProps<typeof Theme> &
  ColorProps<typeof Theme> &
  BackgroundColorProps<typeof Theme> & {
    onChange?: () => void;
    label?: string;
    error?: string;
    placeholder?: string;
    variant?: string;
    items: any;
    currentValue: string;
    setValue: React.Dispatch<any>;
  };

const restyleFunctions = composeRestyleFunctions<typeof Theme, Props>([
  spacing,
  border,
  backgroundColor,
  color,
]);

export default function DropdownInput({ ...rest }: Props) {
  const props = useRestyle(restyleFunctions, rest);
  const [open, setOpen] = useState(false);

  const { error, label, items, currentValue, setValue, placeholder } = props;

  const current = items.find((item: any) => item.value === currentValue);

  return (
    <Box position='relative' marginVertical='xs'>
      {label && (
        <Text variant='label' color='primaryText'>
          {label}
        </Text>
      )}
      {error && <Text color='error'>{error}</Text>}
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Box
          padding='m'
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
          borderColor='border'
          borderWidth={1}
          borderRadius='xs'
        >
          {current ? (
            <Text fontFamily='sora-medium'>{current.label}</Text>
          ) : (
            <Text fontFamily='sora-medium' color='secondaryText'>
              {placeholder}
            </Text>
          )}
          <Icon name='chevron-down' color='white' size={20} />
        </Box>
      </TouchableOpacity>
      {open && (
        <RestyledScrollView
          marginTop='s'
          padding='m'
          backgroundColor='bottomSheetBackground'
          borderRadius='xs'
          maxHeight={250}
        >
          {items.map((item: { label: string; value: string }, index: number) => {
            const lastItemMargin = index === items.length - 1 && items.length > 5;
            const selected = item.value === currentValue;
            console.log(item.value, currentValue);
            return (
              <TouchableOpacity
                key={item.value}
                onPress={() => {
                  setValue(item.value);
                  setOpen(false);
                }}
              >
                <Box
                  marginBottom={lastItemMargin ? "l" : "none"}
                  paddingVertical='sm'
                  borderColor='border'
                  flexDirection='row'
                  alignItems='center'
                >
                  <Icon
                    style={{ marginRight: 6 }}
                    name={selected ? "checkmark-circle" : "ellipse-outline"}
                    size={22}
                    color={selected ? "success" : "white"}
                  />
                  <Text fontFamily='sora-medium'>{item.label}</Text>
                </Box>
              </TouchableOpacity>
            );
          })}
        </RestyledScrollView>
      )}
    </Box>
  );
}
