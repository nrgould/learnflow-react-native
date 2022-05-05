import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image } from "react-native";
import Box from "../../atoms/Box";
import FormTextInput from "../../atoms/FormTextInput";
import Button from "../../atoms/Button";
import { SCREEN_WIDTH } from "../../../theme/layout";
import PageHeaderBack from "../../molecules/PageHeaderBack";
import Icon from "../../atoms/Icon";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../theme/theme";

export default function SavePostScreen({ route }: any) {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const navigation = useNavigation<any>();
  const theme = useTheme<Theme>();
  const { secondaryText } = theme.colors;

  return (
    <Box flex={1} paddingTop='xl' backgroundColor='background'>
      <PageHeaderBack title='Video Details' />
      <Box margin='l' flexDirection='row' justifyContent='space-between'>
        <Box flexDirection='column' alignItems='flex-start' flex={1} width={200}>
          <FormTextInput
            maxLength={150}
            style={{ width: SCREEN_WIDTH * 0.5 }}
            multiline
            onChangeText={(text) => setTitle(text)}
            placeholder='Title'
            returnKeyType='done'
            placeholderTextColor={secondaryText}
            blurOnSubmit
            variant='underline'
          />
          <FormTextInput
            maxLength={150}
            multiline
            style={{ width: SCREEN_WIDTH * 0.5 }}
            onChangeText={(text) => setDescription(text)}
            placeholder='Describe your video'
            returnKeyType='done'
            placeholderTextColor={secondaryText}
            blurOnSubmit
            variant='underline'
          />
          <FormTextInput
            maxLength={20}
            numberOfLines={1}
            style={{ width: SCREEN_WIDTH * 0.5 }}
            onChangeText={(text) => setCategory(text)}
            placeholder='Course'
            returnKeyType='done'
            placeholderTextColor={secondaryText}
            blurOnSubmit
            variant='underline'
          />
          <FormTextInput
            maxLength={20}
            numberOfLines={1}
            style={{ width: SCREEN_WIDTH * 0.5 }}
            onChangeText={(text) => setCategory(text)}
            placeholder='Category'
            returnKeyType='done'
            placeholderTextColor={secondaryText}
            blurOnSubmit
            variant='underline'
          />
        </Box>
        <Image
          style={{
            aspectRatio: 9 / 16,
            backgroundColor: "black",
            width: SCREEN_WIDTH * 0.3,
          }}
          source={{ uri: route.params.source }}
        />
      </Box>
      <Box flex={1} />
      <Box flexDirection='row' alignItems='center' justifyContent='space-around' margin='l'>
        <Button
          variant='tertiary'
          width={SCREEN_WIDTH * 0.41}
          label='Cancel'
          tall
          onPress={() => navigation.goBack()}
          iconLeft={<Icon name='close' size={20} color='white' />}
        />
        <Button
          variant='secondary'
          label='Add Question'
          tall
          width={SCREEN_WIDTH * 0.41}
          onPress={() =>
            navigation.navigate("CreateQuestion", {
              source: route.params.source,
              sourceThumb: route.params.sourceThumb,
              title,
              description,
              category,
              courseId: "i4wTZ9ioTEj7dte4O9Zb",
            })
          }
          iconRight={<Icon name='chevron-forward' size={20} color='white' />}
        />
      </Box>
    </Box>
  );
}
