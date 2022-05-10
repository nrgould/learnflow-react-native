import { useTheme } from "@shopify/restyle";
import React, { useState } from "react";
import { SCREEN_WIDTH } from "../../../theme/layout";
import { Theme } from "../../../theme/theme";
import Box from "../../atoms/Box";
import Button from "../../atoms/Button";
import FormTextInput from "../../atoms/FormTextInput";
import PageHeaderBack from "../../molecules/PageHeaderBack";
import { StackActions, useNavigation } from "@react-navigation/native";
import Icon from "../../atoms/Icon";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { createCourse } from "../../../store/actions/courseActions";
import ColorSelector from "../../molecules/ColorSelector";
import Text from "../../atoms/Text";

export interface Error {
  code: number;
  status: string;
}

const TITLE_ERROR = { code: 1, status: "Title is empty." };
const DESC_ERROR = { code: 2, status: "Description is empty." };
const CATEGORY_ERROR = { code: 3, status: "Please choose a category." };
const COLOR_ERROR = { code: 4, status: "Please select a color." };

export default function CreateCourse() {
  const [formErrors, setFormErrors] = useState<number[]>([]);
  const [formStatus, setFormStatus] = useState<string>("Error in form");
  const [formComplete, setFormComplete] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [color, setColor] = useState("");
  const theme = useTheme<Theme>();
  const userId = useAppSelector((state) => state.auth.userId);
  const { secondaryText } = theme.colors;
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const clearFields = () => {
    setFormComplete(false);
    setFormErrors([]);
    setTitle("");
    setDescription("");
    setCategory("");
    setColor("");
  };

  const checkError = (state: string, error: Error) => {
    const { code, status } = error;
    if (state.length === 0) {
      if (!formErrors.includes(code)) {
        //check if error already exists, add it if it does not
        setFormErrors((errors: number[]) => [...errors, code]);
        setFormStatus(status);
      }
      console.log("error in:", code);
    } else {
      //remove error
      setFormErrors((errors: number[]) => errors.filter((i: number) => i !== code));
    }
  };

  const handleCreateCourse = () => {
    if (title.length > 0 && description.length > 0 && category.length > 0 && color.length > 0) {
      setFormComplete(true);
    }

    checkError(color, COLOR_ERROR);
    checkError(category, CATEGORY_ERROR);
    checkError(description, DESC_ERROR);
    checkError(title, TITLE_ERROR);

    if (formComplete && formErrors.length === 0) {
      console.log("creating course");
      dispatch(createCourse({ title, description, category, userId, color })).then(() => {
        clearFields();
        navigation.dispatch(StackActions.popToTop());
      });
    }
  };

  return (
    <Box flex={1} paddingTop='xl' backgroundColor='background'>
      <PageHeaderBack title='Create Course' />
      <Box margin='l' flexDirection='row' justifyContent='space-between'>
        <Box flexDirection='column' alignItems='flex-start' flex={1} width={200}>
          <FormTextInput
            value={title}
            maxLength={150}
            style={{ width: SCREEN_WIDTH * 0.9 }}
            multiline
            label='Course Title'
            borderBottomColor={formErrors.includes(TITLE_ERROR.code) ? "error" : "border"}
            borderBottomWidth={formErrors.includes(TITLE_ERROR.code) ? 2 : 1}
            onChangeText={(text) => {
              checkError(text, TITLE_ERROR);
              setTitle(text);
            }}
            placeholder='"Calculus 1"'
            returnKeyType='done'
            placeholderTextColor={secondaryText}
            blurOnSubmit
            variant='underline'
            marginBottom='l'
          />
          <FormTextInput
            value={description}
            maxLength={150}
            multiline
            label='Description'
            borderBottomColor={formErrors.includes(DESC_ERROR.code) ? "error" : "border"}
            borderBottomWidth={formErrors.includes(DESC_ERROR.code) ? 2 : 1}
            style={{ width: SCREEN_WIDTH * 0.9 }}
            onChangeText={(text) => {
              checkError(text, DESC_ERROR);
              setDescription(text);
            }}
            placeholder='Describe your course'
            returnKeyType='done'
            placeholderTextColor={secondaryText}
            blurOnSubmit
            variant='underline'
            marginBottom='l'
          />
          <FormTextInput
            value={category}
            maxLength={20}
            numberOfLines={1}
            label='Category'
            style={{ width: SCREEN_WIDTH * 0.9 }}
            borderBottomColor={formErrors.includes(CATEGORY_ERROR.code) ? "error" : "border"}
            borderBottomWidth={formErrors.includes(CATEGORY_ERROR.code) ? 2 : 1}
            onChangeText={(text) => {
              checkError(text, CATEGORY_ERROR);
              setCategory(text);
            }}
            placeholder='i.e. Calculus, Algebra'
            returnKeyType='done'
            placeholderTextColor={secondaryText}
            blurOnSubmit
            variant='underline'
            marginBottom='l'
          />
        </Box>
      </Box>
      <Box margin='l' paddingVertical='s'>
        <ColorSelector
          error={COLOR_ERROR}
          color={color}
          setColor={setColor}
          checkError={checkError}
          hasError={formErrors.includes(COLOR_ERROR.code)}
        />
      </Box>
      {formErrors.length > 0 && (
        <Box position='absolute' bottom={85} left={0} right={0}>
          <Text color='error' textAlign='center'>
            {formStatus}
          </Text>
        </Box>
      )}
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
          variant='primary'
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
