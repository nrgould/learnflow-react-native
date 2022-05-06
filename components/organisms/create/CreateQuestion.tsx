import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import Box from "../../atoms/Box";
import FormTextInput from "../../atoms/FormTextInput";
import Button from "../../atoms/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { createPost } from "../../../store/postSlice";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../theme/layout";
import PageHeaderBack from "../../molecules/PageHeaderBack";
import Text from "../../atoms/Text";
import { Option } from "../../../types";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../theme/theme";
import Icon from "../../atoms/Icon";
import Counter from "../../molecules/Counter";
import RestyledScrollView from "../../atoms/RestyledScrollView";
import OptionFormBox from "../../molecules/OptionFormBox";

const TEXT_ERROR = 4;

export default function CreateQuestion({ route }: any) {
  const [formErrors, setFormErrors] = useState<number[]>([]);
  const [hasAnswer, setHasAnswer] = useState<boolean>(false);
  const [formStatus, setFormStatus] = useState<string>("");
  const [formComplete, setFormComplete] = useState<boolean>(false);
  const [questionText, setQuestionText] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(2);
  const theme = useTheme<Theme>();
  const [options, setOptions] = useState<Option[]>([
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
  const { primaryText, secondaryText } = theme.colors;

  const handleSavePost = () => {
    //check to make sure all forms have been filled
    if (questionText.length > 0) {
      setFormComplete(true);
    } else if (!formErrors.includes(TEXT_ERROR)) {
      setFormErrors((errors: number[]) => [...errors, TEXT_ERROR]);
    }

    options.forEach((option: Option, index: number) => {
      if (option.content.length === 0) {
        setFormComplete(false);
        if (!formErrors.includes(index)) {
          setFormErrors((errors: number[]) => [...errors, index]);
        }
      } else {
        //remove error
        setFormErrors((errors: number[]) => errors.filter((i: number) => i !== index));
      }
      if (option.isAnswer) {
        //sets to true if question has at least one answer
        setHasAnswer(true);
      }
    });

    if (formComplete && hasAnswer && formErrors.length === 0) {
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
    } else if (!hasAnswer) {
      setFormStatus("This question needs a correct answer!");
    } else if (!formComplete) {
      setFormStatus("Please fill out all fields.");
    } else {
      setFormStatus("Error in form");
    }
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
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : "height"}>
        <RestyledScrollView style={{ height: SCREEN_HEIGHT }}>
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
                borderColor={formErrors.some((e: number) => e === TEXT_ERROR) ? "error" : "border"}
                onChangeText={(text) => {
                  if (text.length > 0) {
                    setFormErrors((errors: number[]) =>
                      errors.filter((i: number) => i !== TEXT_ERROR)
                    );
                  }
                  setQuestionText(text);
                }}
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
                const error = formErrors.includes(index);
                return (
                  <OptionFormBox
                    key={option.id}
                    setFormErrors={setFormErrors}
                    setOptions={setOptions}
                    index={index}
                    error={error}
                    option={option}
                  />
                );
              })}
            </Box>
          </Box>
          {formStatus.length !== 0 && (
            <Box position='absolute' bottom={90} left={0} right={0}>
              <Text color='error' textAlign='center'>
                {formStatus}
              </Text>
            </Box>
          )}
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
