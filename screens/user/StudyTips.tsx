import React from "react";
import Box from "../../components/atoms/Box";
import ListItem from "../../components/atoms/ListItem";
import Text from "../../components/atoms/Text";
import { ScrollView } from "react-native";
import PageHeaderBack from "../../components/molecules/PageHeaderBack";

export default function StudyTips() {
  return (
    <Box flex={1} backgroundColor='background'>
      <ScrollView>
        <Box margin='m' marginTop='l' marginBottom='s'>
          <PageHeaderBack title='Study Tips' />
        </Box>
        <Box margin='m'>
          <Text variant='subheader' fontFamily='sora-bold'>
            DONT DO THIS
          </Text>
          <ListItem
            iconColor='error'
            name='close'
            text='Study for hours on end without taking a break'
          />
          <ListItem
            iconColor='error'
            name='close'
            text='Begin studying the day or two before an exam'
          />
          <ListItem
            iconColor='error'
            name='close'
            text='Focus on rote memorization / memorizing processes'
          />
          <ListItem
            iconColor='error'
            name='close'
            text='NEVER pull an all-nighter before an exam'
          />
          <ListItem
            iconColor='error'
            name='close'
            text='Simply reading and re-reading textbooks thinking you have it down.'
          />
          <ListItem
            iconColor='error'
            name='close'
            text="Give up on a concept or problem because you don't understand it immediately"
          />
        </Box>
        <Box margin='m'>
          <Text variant='subheader' fontFamily='sora-bold'>
            DO THIS
          </Text>
          <ListItem
            iconColor='success'
            name='checkmark'
            text='Break up studying into chunks of 50 minutes or less'
          />
          <ListItem
            iconColor='success'
            name='checkmark'
            text='Begin studying weeks before the exam'
          />
          <ListItem
            iconColor='success'
            name='checkmark'
            text='Mix up a few related concepts into a single study session (interleaving)'
          />
          <ListItem
            iconColor='success'
            name='checkmark'
            text='Focus on understanding concepts, which will allow you to bridge connections between concepts.'
          />
          <ListItem
            iconColor='success'
            name='checkmark'
            text='Give yourself plenty of rest. This has been scientifically proven to be the best way to commit information to long-term memory. '
          />
          <ListItem
            iconColor='success'
            name='checkmark'
            text='The only way to get better at a skill is to practice'
          />
          <ListItem
            iconColor='success'
            name='checkmark'
            text="The best learning comes from when you're struggling and yet you persevere"
          />
        </Box>
      </ScrollView>
    </Box>
  );
}
