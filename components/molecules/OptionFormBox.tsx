import React from "react";
import Box from "../atoms/Box";
import FormTextInput from "../atoms/FormTextInput";
import { OPTIONS_BOX_HEIGHT } from "../../theme/layout";
import { lightHaptic } from "../../util/hapticFeedback";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Option } from "../../types";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme/theme";

interface Props {
  option: Option;
  setFormErrors: React.Dispatch<any>;
  setOptions: React.Dispatch<any>;
  index: number;
  error: boolean;
}

export default function OptionFormBox({ option, setFormErrors, setOptions, index, error }: Props) {
  const theme = useTheme<Theme>();

  const { border, secondary, primaryText, secondaryText, tertiaryText, buttonTextBlack } =
    theme.colors;
  return (
    <Box key={option.id} flexDirection='row' alignItems='center' justifyContent='space-between'>
      <Box flex={1} marginRight='l'>
        <FormTextInput
          variant='question'
          style={{
            height: OPTIONS_BOX_HEIGHT - 10,
            color: option.isAnswer ? primaryText : buttonTextBlack,
          }}
          padding='none'
          borderColor={error ? "error" : "border"}
          borderWidth={error ? 2 : 0}
          maxLength={30}
          numberOfLines={1}
          value={option.content}
          onChangeText={(text) => {
            if (text.length > 0) {
              setFormErrors((errors: number[]) => errors.filter((i: number) => i !== index));
            }

            setOptions((options: any) => {
              return [
                ...options.slice(0, index),
                { ...option, content: text },
                ...options.slice(index + 1, options.length),
              ];
            });
          }}
          placeholder={`Option #${index + 1}`}
          returnKeyType='done'
          textAlign='center'
          backgroundColor={option.isAnswer ? "success" : "disabled"}
          placeholderTextColor={option.isAnswer ? secondaryText : tertiaryText}
          blurOnSubmit
        />
      </Box>
      <Box alignItems='center' justifyContent='center'>
        <BouncyCheckbox
          size={28}
          isChecked={option.isAnswer}
          fillColor={secondary}
          unfillColor={border}
          style={{ borderRadius: 6 }}
          onPress={(isChecked) => {
            lightHaptic();
            setOptions((options: any) => {
              return [
                ...options.slice(0, index),
                { ...option, isAnswer: isChecked },
                ...options.slice(index + 1, options.length),
              ];
            });
          }}
        />
      </Box>
    </Box>
  );
}
