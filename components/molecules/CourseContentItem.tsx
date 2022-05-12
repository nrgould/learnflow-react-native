import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { CourseModuleType } from "../../types";
import Box from "../atoms/Box";
import Card from "../atoms/Card";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";

interface Props {
  module: CourseModuleType;
}

export default function CourseContentItem({ module }: Props) {
  const navigation = useNavigation<any>();

  console.log(module);

  const completed = false;
  return (
    <TouchableOpacity onPress={() => navigation.navigate("CourseFeed", { id: module.id })}>
      <Card
        padding='m'
        paddingHorizontal='m'
        variant='primary'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        style={{ position: "relative" }}
      >
        <Box flexDirection='column' alignItems='center' justifyContent='center' position='relative'>
          <Box borderRadius='s' opacity={0.5} overflow='hidden' marginBottom='s'>
            <Image
              style={{ width: 120, height: 120, resizeMode: "cover" }}
              source={{ uri: module.thumbnail }}
            />
          </Box>
          <Text
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            variant='subheader'
          >
            {module.title}
          </Text>
        </Box>
        {completed ? (
          <Icon size={32} name='checkmark-sharp' color='success' />
        ) : (
          <Icon name='chevron-forward-outline' color='activeIcon' size={32} />
        )}
      </Card>
    </TouchableOpacity>
  );
}
