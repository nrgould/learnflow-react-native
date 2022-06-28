import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import { SCREEN_WIDTH } from "../../theme/layout";
import { CourseModuleType } from "../../types";
import Box from "../atoms/Box";
import Card from "../atoms/Card";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";

interface Props {
  module: CourseModuleType;
}

const ITEM_WIDTH = SCREEN_WIDTH * 0.42;

export default function CourseContentItem({ module }: Props) {
  const navigation = useNavigation<any>();

  console.log(module);

  const completed = false;
  return (
    <TouchableOpacity onPress={() => navigation.navigate("CourseFeed", { id: module.id })}>
      <Box flexDirection='column' alignItems='center' justifyContent='center' position='relative'>
        <ImageBackground
          style={{
            width: ITEM_WIDTH,
            height: ITEM_WIDTH,
            borderRadius: 4,
            overflow: "hidden",
            opacity: 0.5,
          }}
          source={{ uri: module.thumbnail }}
        >
          <Text
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            variant='subheader'
          >
            {module.title}
          </Text>
        </ImageBackground>
        {/* <Box borderRadius='s' opacity={0.5} overflow='hidden' marginBottom='s'>
          <Image
            style={{ width: ITEM_WIDTH, height: ITEM_WIDTH, resizeMode: "cover" }}
            source={{ uri: module.thumbnail }}
          />
        </Box> */}
      </Box>
      {/* {completed ? (
        <Icon size={32} name='checkmark-sharp' color='success' />
      ) : (
        <Icon name='chevron-forward-outline' color='activeIcon' size={32} />
      )} */}
    </TouchableOpacity>
  );
}
