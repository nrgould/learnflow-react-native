import React, { useState } from "react";
import Box from "../atoms/Box";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme/theme";
import ColorBox from "../atoms/ColorBox";
import Text from "../atoms/Text";

export default function ColorSelector() {
  const [color, setColor] = useState("");
  const theme = useTheme<Theme>();
  const colors = theme.colors;
  const palette = [colors.primary, colors.secondary, colors.warning, colors.error, colors.success];
  return (
    <>
      <Text variant='subheader'>Course Color</Text>
      <Box flexDirection='row'>
        {palette.map((col) => {
          return <ColorBox color={col} setColor={setColor} selected={color === col} />;
        })}
      </Box>
    </>
  );
}
