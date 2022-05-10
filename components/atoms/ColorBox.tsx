import React from "react";
import { TouchableOpacity } from "react-native";
import { SCREEN_WIDTH } from "../../theme/layout";
import Box from "./Box";
import Icon from "./Icon";

interface Props {
  selected: boolean;
  color: string;
  setColor: (color: string) => void;
}

const SIZE = SCREEN_WIDTH / 8;

export default function ColorBox({ selected, color, setColor }: Props) {
  return (
    <TouchableOpacity onPress={() => setColor(color)}>
      <Box
        borderColor='foreground'
        borderWidth={selected ? 3 : 0}
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
