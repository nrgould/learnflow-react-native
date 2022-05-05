import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
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
import { lightHaptic } from "../../../util/hapticFeedback";
import Counter from "../../molecules/Counter";
import RestyledScrollView from "../../atoms/RestyledScrollView";

export default function CreateQuestion({ route }: any) {
  const [questionText, setQuestionText] = useState<any>("");
  const [attempts, setAttempts] = useState<number>(2);
  const theme = useTheme<Theme>();
  const [options, setOptions] = useState<any>([
    { id: "01", isAnswer: false, content: "" },
    { id: "02", isAnswer: false, content: "" },
    { id: "03", isAnswer: false, content: "" },
    { id: "04", isAnswer: false, content: "" },
  ]);
  const [requestRunning, setRequestRunning] = useState(false);
  const navigation = useNavigation();
  const userId = useAppSelector((state) => state.auth.userId);
  const progress = useAppSelector((state) => state.post.progress);
  const dispatch = useAppDispatch();
  const { border, secondary, primaryText, secondaryText, tertiaryText, buttonTextBlack } =
    theme.colors;

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
        question: { questionText, questionOptions: options, attempts },
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
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <RestyledScrollView>
          <PageHeaderBack title='Add Question' />
          <Box
            marginHorizontal='l'
            marginVertical='m'
            flexDirection='row'
            justifyContent='space-between'
          >
            <Box flexDirection='column' flex={1}>
              <Text variant='subheader' fontSize={18} marginBottom='s'>
                Question Text
              </Text>
              <FormTextInput
                variant='answerBox'
                maxLength={150}
                multiline
                onChangeText={(text) => setQuestionText(text)}
                placeholder='Write your question here'
                returnKeyType='done'
                textAlign='center'
                blurOnSubmit
                style={{ color: primaryText, fontSize: 18 }}
                placeholderTextColor={secondaryText}
              />
            </Box>
          </Box>
          <Box margin='l'>
            <Text variant='subheader' fontSize={18} marginBottom='s'>
              Attempts
            </Text>
            <Counter state={attempts} setState={setAttempts} min={1} max={3} />
          </Box>
          <Box margin='l'>
            <Box flexDirection='row' justifyContent='space-between'>
              <Text variant='subheader' fontSize={18} marginBottom='s'>
                Question Options
              </Text>
              <Text variant='subheader' fontSize={18} marginBottom='s'>
                Answer?
              </Text>
            </Box>
            <Box flexDirection='column'>
              {options.map((option: Option, index: number) => {
                return (
                  <Box
                    key={option.id}
                    flexDirection='row'
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Box flex={1} marginRight='l'>
                      <FormTextInput
                        variant='question'
                        style={{
                          height: OPTIONS_BOX_HEIGHT - 10,
                          color: option.isAnswer ? primaryText : buttonTextBlack,
                        }}
                        padding='none'
                        maxLength={30}
                        numberOfLines={1}
                        value={option.content}
                        onChangeText={(text) =>
                          setOptions((opts: any) => {
                            return [
                              ...opts.slice(0, index),
                              { ...option, content: text },
                              ...opts.slice(index + 1, options.length),
                            ];
                          })
                        }
                        placeholder={`Option #${index + 1}`}
                        returnKeyType='done'
                        textAlign='center'
                        backgroundColor={option.isAnswer ? "success" : "disabled"}
                        placeholderTextColor={option.isAnswer ? secondaryText : tertiaryText}
                        blurOnSubmit
                      />
                    </Box>
                    <Box alignItems='center' justifyContent='center'>
                      <BouncyCheckbox
                        size={28}
                        isChecked={option.isAnswer}
                        fillColor={secondary}
                        unfillColor={border}
                        style={{ borderRadius: 6 }}
                        onPress={(isChecked) => {
                          lightHaptic();
                          setOptions((opts: any) => {
                            return [
                              ...opts.slice(0, index),
                              { ...option, isAnswer: isChecked },
                              ...opts.slice(index + 1, options.length),
                            ];
                          });
                        }}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box flex={1} />
          <Box
            flexDirection='row'
            alignItems='center'
            justifyContent='space-around'
            margin='l'
            marginTop='m'
          >
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
              iconRight={<Icon name='return-down-forward-outline' size={20} color='white' />}
            />
          </Box>
        </RestyledScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
}
