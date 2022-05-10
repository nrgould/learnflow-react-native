import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import Box from "../../atoms/Box";
import FormTextInput from "../../atoms/FormTextInput";
import Button from "../../atoms/Button";
import { SCREEN_WIDTH } from "../../../theme/layout";
import PageHeaderBack from "../../molecules/PageHeaderBack";
import Icon from "../../atoms/Icon";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../theme/theme";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchUserCreatedCourses } from "../../../store/actions/courseActions";
import DropdownInput from "../../atoms/DropdownInput";

export default function SavePostScreen({ route }: any) {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<any>();
  const [selectedCourse, setSelectedCourse] = useState<any>("");
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();
  const { secondaryText } = theme.colors;
  const createdCourses = useAppSelector((state) => state.course.createdCourses);
  const userId = useAppSelector((state) => state.auth.userId);

  console.log("CURRENT COURSE:", selectedCourse);

  useEffect(() => {
    dispatch(fetchUserCreatedCourses(userId));
  }, [dispatch]);

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
          <FormTextInput
            maxLength={150}
            multiline
            marginTop='m'
            style={{ width: SCREEN_WIDTH * 0.5 }}
            onChangeText={(text) => setDescription(text)}
            placeholder='Describe your video'
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
      <Box marginHorizontal='l'>
        <DropdownInput
          label='Choose Course'
          items={createdCourses.map((c) => ({ label: c.title, value: c.id }))}
          currentValue={selectedCourse}
          setValue={setSelectedCourse}
          placeholder='Choose:'
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
              courseId: selectedCourse,
            })
          }
          iconRight={<Icon name='chevron-forward' size={20} color='white' />}
        />
      </Box>
    </Box>
  );
}
