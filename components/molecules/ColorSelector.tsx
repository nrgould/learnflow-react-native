import React from "react";
import Box from "../atoms/Box";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme/theme";
import ColorBox from "../atoms/ColorBox";
import Text from "../atoms/Text";
import { Error } from "../organisms/create/CreateCourse";

interface Props {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  error: Error;
  checkError: (color: string, error: Error) => void;
  hasError: boolean;
}

export default function ColorSelector({ color, setColor, error, checkError, hasError }: Props) {
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
    colors.mint,
    colors.hanPurple,
    colors.royalPurple,
    colors.glaucous,
    colors.pacificBlue,
  ];

  const onSetColor = (selectedColor: string) => {
    checkError(selectedColor, error);
    setColor(selectedColor);
  };
  return (
    <>
      <Text variant='label'>Course Color</Text>
      <Box
        flexDirection='row'
        flexWrap='wrap'
        alignItems='center'
        justifyContent='center'
        borderWidth={hasError ? 2 : 0}
        borderColor={hasError ? "error" : "border"}
        borderRadius='s'
      >
        {palette.map((col) => {
          return <ColorBox key={col} color={col} setColor={onSetColor} selected={color === col} />;
        })}
      </Box>
    </>
  );
}
