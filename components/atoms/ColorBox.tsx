import React from "react";
import { TouchableOpacity } from "react-native";
import { SCREEN_WIDTH } from "../../theme/layout";
import Box from "./Box";
import Icon from "./Icon";
import Text from "./Text";

interface Props {
  selected: boolean;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const SIZE = SCREEN_WIDTH / 8;

export default function ColorBox({ selected, color, setColor }: Props) {
  return (
    <TouchableOpacity onPress={() => setColor(color)}>
      <Box
        borderColor='primary'
        borderWidth={selected ? 2 : 0}
        borderRadius='xs'
        width={SIZE}
        height={SIZE}
        style={{ backgroundColor: color }}
        alignItems='center'
        justifyContent='center'
        margin='xs'
      >
        <Icon name={selected ? "checkmark" : "add"} size={20} color='white' />
      </Box>
    </TouchableOpacity>
  );
}
