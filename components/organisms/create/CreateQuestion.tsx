import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Box from "../../atoms/Box";
import FormTextInput from "../../atoms/FormTextInput";
import Button from "../../atoms/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { createPost } from "../../../store/postSlice";
import { OPTIONS_BOX_HEIGHT, SCREEN_WIDTH } from "../../../theme/layout";
import PageHeaderBack from "../../molecules/PageHeaderBack";
import Text from "../../atoms/Text";
import { Option } from "../../../types";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../theme/theme";
import Icon from "../../atoms/Icon";

export default function CreateQuestion({ route }: any) {
  const [questionText, setQuestionText] = useState<any>("");
  const theme = useTheme<Theme>();
  const [options, setOptions] = useState<any>([
    { id: "01", isAnswer: false, content: "X - 3" },
    { id: "02", isAnswer: false, content: "X + 3" },
    { id: "03", isAnswer: false, content: "X - 6" },
    { id: "04", isAnswer: false, content: "X + 6" },
  ]);
  const [requestRunning, setRequestRunning] = useState(false);
  const navigation = useNavigation();
  const userId = useAppSelector((state) => state.auth.userId);
  const progress = useAppSelector((state) => state.post.progress);
  const dispatch = useAppDispatch();
  const { border, success } = theme.colors;

  const handleSavePost = () => {
    setRequestRunning(true);
    dispatch(
      createPost({
        description: route.params.description,
        video: route.params.source,
        title: route.params.title,
        thumbnail: route.params.sourceThumb,
        courseId: "i4wTZ9ioTEj7dte4O9Zb",
        userId,
        question: { questionText, questionOptions: options },
      })
    )
      .then(() => navigation.dispatch(StackActions.popToTop()))
      .catch(() => setRequestRunning(false));
  };

  if (requestRunning) {
    return (
      <Box flex={1} alignItems='center' backgroundColor='background' justifyContent='center'>
        <Text marginBottom='m'>Uploading Video: {progress}%</Text>
        <ActivityIndicator color='red' size='large' />
      </Box>
    );
  }

  return (
    <Box flex={1} paddingTop='xl' backgroundColor='background'>
      <PageHeaderBack title='Add Question' />
      <Box margin='l' flexDirection='row' justifyContent='space-between'>
        <Box flexDirection='column' flex={1}>
          <Text variant='subheader'>Question Text</Text>
          <FormTextInput
            variant='answerBox'
            maxLength={150}
            multiline
            onChangeText={(text) => setQuestionText(text)}
            placeholder='Write your question here'
            returnKeyType='done'
            textAlign='center'
            blurOnSubmit
          />
        </Box>
      </Box>
      <Box margin='l' flexDirection='row' justifyContent='space-between'>
        <Box flexDirection='column' justifyContent='flex-start' flex={1}>
          <Text variant='subheader'>Question Options</Text>
          {options.map((option: Option) => {
            return (
              <Box key={option.id} flexDirection='row' width='100%' flex={1}>
                <FormTextInput
                  variant='question'
                  style={{ height: OPTIONS_BOX_HEIGHT }}
                  numberOfLines={1}
                  onChangeText={(text) => setOptions([...options, { ...option, content: text }])}
                  placeholder='Option 1'
                  returnKeyType='done'
                  textAlign='center'
                  blurOnSubmit
                />
                <Box flexDirection='column' alignItems='center' justifyContent='center'>
                  <Text variant='body'>Answer ?</Text>
                  <BouncyCheckbox
                    size={28}
                    fillColor={success}
                    unfillColor={border}
                    style={{ borderRadius: 6 }}
                    onPress={(isChecked) => {
                      console.log(isChecked);
                      // setOptions(
                      // 	[...options].map((object) => {
                      // 		if (
                      // 			object.id === option.id
                      // 		) {
                      // 			return {
                      // 				...object,
                      // 				isAnswer: isChecked,
                      // 			};
                      // 		}
                      // 	})
                      // );
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box flex={1} />
      <Box flexDirection='row' alignItems='center' justifyContent='space-around' margin='l'>
        <Button
          variant='tertiary'
          width={SCREEN_WIDTH * 0.41}
          label='Back'
          tall
          onPress={() => navigation.goBack()}
          iconLeft={<Icon name='chevron-back' size={20} color='white' />}
        />
        <Button
          variant='primary'
          label='Post'
          tall
          width={SCREEN_WIDTH * 0.41}
          onPress={() => handleSavePost()}
          iconRight={<Icon name='ios-cloud-upload' size={20} color='white' />}
        />
      </Box>
    </Box>
  );
}
