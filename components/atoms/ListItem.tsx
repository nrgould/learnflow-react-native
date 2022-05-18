import React from "react";
import Box from "./Box";
import Text from "./Text";
import { Ionicons } from "@expo/vector-icons";
import Icon from "./Icon";
import { SCREEN_WIDTH } from "../../theme/layout";

interface Props extends React.ComponentProps<typeof Ionicons> {
  text: string;
  iconColor: "success" | "error" | "warning" | "activeIcon" | "white" | "secondaryText";
}

export default function ListItem({ text, iconColor, ...props }: Props) {
  return (
    <Box flexDirection='row' alignItems='center' justifyContent='flex-start' marginVertical='s'>
      <Icon size={28} {...props} color={iconColor} style={{ marginRight: 8 }} />
      <Text style={{ maxWidth: SCREEN_WIDTH * 0.8 }}>{text}</Text>
    </Box>
  );
}
