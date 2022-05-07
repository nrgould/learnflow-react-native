import { useTheme } from "@shopify/restyle";
import React, { useState } from "react";
import { SCREEN_WIDTH } from "../../../theme/layout";
import { Theme } from "../../../theme/theme";
import Box from "../../atoms/Box";
import Button from "../../atoms/Button";
import FormTextInput from "../../atoms/FormTextInput";
import PageHeaderBack from "../../molecules/PageHeaderBack";
import { useNavigation } from "@react-navigation/native";
import Icon from "../../atoms/Icon";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { createCourse } from "../../../store/actions/courseActions";
import ColorSelector from "../../molecules/ColorSelector";

export default function CreateCourse() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [color, setColor] = useState("");
  const theme = useTheme<Theme>();
  const userId = useAppSelector((state) => state.auth.userId);
  const { secondaryText } = theme.colors;
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  console.log(color);

  const handleCreateCourse = () => {
    console.log("creating course");
    dispatch(createCourse({ title, description, category, userId, color })).then((response) => {
      console.log(response);
      // navigation.navigate("CourseDetails", { response });
    });
  };

  return (
    <Box flex={1} paddingTop='xl' backgroundColor='background'>
      <PageHeaderBack title='Create Course' />
      <Box margin='l' flexDirection='row' justifyContent='space-between'>
        <Box flexDirection='column' alignItems='flex-start' flex={1} width={200}>
          <FormTextInput
            maxLength={150}
            style={{ width: SCREEN_WIDTH * 0.9 }}
            multiline
            label='Course Title'
            onChangeText={(text) => setTitle(text)}
            placeholder='"Calculus 1"'
            returnKeyType='done'
            placeholderTextColor={secondaryText}
            blurOnSubmit
            variant='underline'
            marginBottom='l'
          />
          <FormTextInput
            maxLength={150}
            multiline
            label='Description'
            style={{ width: SCREEN_WIDTH * 0.9 }}
            onChangeText={(text) => setDescription(text)}
            placeholder='Describe your course'
            returnKeyType='done'
            placeholderTextColor={secondaryText}
            blurOnSubmit
            variant='underline'
            marginBottom='l'
          />
          <FormTextInput
            maxLength={20}
            numberOfLines={1}
            label='Category'
            style={{ width: SCREEN_WIDTH * 0.9 }}
            onChangeText={(text) => setCategory(text)}
            placeholder='i.e. Calculus, Algebra'
            returnKeyType='done'
            placeholderTextColor={secondaryText}
            blurOnSubmit
            variant='underline'
            marginBottom='l'
          />
        </Box>
      </Box>
      <Box margin='l'>
        <ColorSelector color={color} setColor={setColor} />
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
          variant='success'
          label='Create Course'
          tall
          width={SCREEN_WIDTH * 0.41}
          onPress={handleCreateCourse}
          iconRight={<Icon name='return-down-forward' size={20} color='white' />}
        />
      </Box>
    </Box>
  );
}
