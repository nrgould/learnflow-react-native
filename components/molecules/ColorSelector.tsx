import React from "react";
import Box from "../atoms/Box";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme/theme";
import ColorBox from "../atoms/ColorBox";
import Text from "../atoms/Text";

interface Props {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

export default function ColorSelector({ color, setColor }: Props) {
  const theme = useTheme<Theme>();
  const colors = theme.colors;
  const palette = [
    colors.claret,
    colors.mulberryCrayola,
    colors.cinnabar,
    colors.fieryRose,
    colors.mango,
    colors.maizeCrayola,
    colors.aqua,
    colors.springGreen,
    colors.glaucous,
    colors.pacificBlue,
    colors.hanPurple,
    colors.royalPurple,
  ];
  return (
    <>
      <Text variant='label'>Course Color</Text>
      <Box flexDirection='row' flexWrap='wrap'>
        {palette.map((col) => {
          return <ColorBox key={col} color={col} setColor={setColor} selected={color === col} />;
        })}
      </Box>
    </>
  );
}
