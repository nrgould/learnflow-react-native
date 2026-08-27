import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { SCREEN_WIDTH } from "../../theme/layout";
import { CourseModuleType } from "../../types";
import Box from "../atoms/Box";
import Text from "../atoms/Text";

interface Props {
  module: CourseModuleType;
}

const MODULE_SIZE = SCREEN_WIDTH * 0.42;

export default function CourseContentItem({ module }: Props) {
  const navigation = useNavigation<any>();

  console.log(module);
  return (
    <TouchableOpacity onPress={() => navigation.navigate("CourseFeed", { id: module.id })}>
      <Box width={MODULE_SIZE} height={MODULE_SIZE} overflow='hidden' borderRadius='s'>
        <ImageBackground
          style={{
            width: MODULE_SIZE,
            height: MODULE_SIZE,
          }}
          resizeMode='cover'
          source={{ uri: module.thumbnail }}
        >
          <Text
            style={{
              flex: 1,
              lineHeight: MODULE_SIZE,
              textAlign: "center",
              textAlignVertical: "center",
              backgroundColor: "#0000008d",
            }}
            fontFamily='sora-semibold'
            variant='subheader'
          >
            {module.title}
          </Text>
        </ImageBackground>
      </Box>
    </TouchableOpacity>
  );
}
