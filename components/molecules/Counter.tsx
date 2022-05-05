import React from "react";
import Box from "../atoms/Box";
import { TouchableOpacity } from "react-native";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";

interface CounterProps {
  min: number;
  max: number;
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
}

export default function Counter({ state, setState, min, max }: CounterProps) {
  return (
    <Box flexDirection='row' alignItems='center' justifyContent='center'>
      <TouchableOpacity onPress={() => setState(state === min ? state : state - 1)}>
        <Icon name='remove' size={28} color='activeIcon' />
      </TouchableOpacity>
      <Box marginHorizontal='xl'>
        <Text variant='subheader'>{state}</Text>
      </Box>
      <TouchableOpacity onPress={() => setState(state === max ? state : state + 1)}>
        <Icon name='add' size={28} color='activeIcon' />
      </TouchableOpacity>
    </Box>
  );
}
