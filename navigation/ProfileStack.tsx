import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@shopify/restyle";
import React from "react";
import CourseDetails from "../screens/course/CourseDetails";
import Account from "../screens/user/Account";
import Profile from "../screens/user/Profile";
import UploadVideo from "../screens/user/UploadVideo";
import { Theme } from "../theme/theme";

const ProfileStackScreen = createNativeStackNavigator();

export default function ProfileStack() {
  const theme = useTheme<Theme>();

  const { background, primaryText } = theme.colors;

  return (
    <ProfileStackScreen.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: primaryText,
        headerStyle: {
          backgroundColor: background,
        },
        headerBackTitleVisible: false,
      }}
    >
      <ProfileStackScreen.Screen name='Profile' component={Profile} />
      <ProfileStackScreen.Screen name='Account' component={Account} />
      <ProfileStackScreen.Screen name='UploadContent' component={UploadVideo} />
      <ProfileStackScreen.Screen name='CourseDetails' component={CourseDetails} />
    </ProfileStackScreen.Navigator>
  );
}
