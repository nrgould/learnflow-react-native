import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Box from "../../components/atoms/Box";
import Card from "../../components/atoms/Card";
import RestyledSafeAreaView from "../../components/atoms/RestyledSafeAreaView";
import Text from "../../components/atoms/Text";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useItemHeight } from "../../hooks/useItemHeight";
import { clearCurrentUserProfile, fetchCurrentUserAsync } from "../../store/profileSlice";
import { setDarkMode } from "../../store/themeSlice";
import BottomSheet from "@gorhom/bottom-sheet";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme/theme";
import Icon from "../../components/atoms/Icon";
import { useNavigation } from "@react-navigation/native";
import SettingsList from "../../components/molecules/SettingsList";
import { fetchUserCreatedCourses } from "../../store/actions/courseActions";
import { TouchableOpacity } from "react-native";

export default function Profile() {
  const [bottomSheetActive, setBottomSheetActive] = useState(false);
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const itemHeight = useItemHeight();
  const profile = useAppSelector((state) => state.profile.currentUserProfile);
  const userId = useAppSelector((state) => state.auth.userId);
  const status = useAppSelector((state) => state.profile.status);
  const createdCourses = useAppSelector((state) => state.course.createdCourses);
  const courseStatus = useAppSelector((state) => state.course.status);
  const navigation = useNavigation<any>();
  const theme = useTheme<Theme>();
  const { foreground, bottomSheetBackground } = theme.colors;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    if (index === -1) {
      setBottomSheetActive(false);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchCurrentUserAsync(userId));
    dispatch(fetchUserCreatedCourses(userId));
    navigation.setOptions({
      headerShown: false,
    });
    return () => {
      dispatch(clearCurrentUserProfile());
    };
  }, [dispatch]);

  function handleSetDarkMode() {
    dispatch(setDarkMode({ mode: !darkMode, userId }));
  }

  if (status === "loading") {
    return (
      <Box backgroundColor='background' flex={1} alignItems='center' justifyContent='center'>
        <Text variant='subheader'>Loading...</Text>
      </Box>
    );
  }

  return (
    <RestyledSafeAreaView>
      <Box height={itemHeight} marginTop='s' marginHorizontal='m' backgroundColor='background'>
        <Box flexDirection='row' width='100%' alignItems='center' justifyContent='space-between'>
          <Text variant='header' fontSize={28}>
            {profile?.displayName}
          </Text>
          <Icon
            onPress={() => setBottomSheetActive(!bottomSheetActive)}
            name='cog-outline'
            color='activeIcon'
            size={32}
          />
        </Box>
        <Card height={itemHeight * 0.2} variant='primary' marginBottom='m'>
          <Text variant='body' marginBottom='s'>
            {profile?.email}
          </Text>
          <Text variant='body' color='primary' fontFamily='poppins-semibold' marginBottom='s'>
            Study Karma: {profile?.karma}
          </Text>
        </Card>
        <Box
          flexDirection='column'
          alignItems='center'
          justifyContent='space-around'
          marginVertical='l'
        >
          <Box
            flexDirection='row'
            alignItems='center'
            justifyContent='space-between'
            width='100%'
            marginBottom='l'
          >
            <Text variant='body' fontFamily='poppins-semibold'>
              Study Karma: {profile?.karma}
            </Text>
            <Text variant='body' fontFamily='poppins-semibold'>
              499 Karma to Master
            </Text>
          </Box>
          <Box position='relative' width='100%'>
            <Box
              backgroundColor='success'
              width={120}
              height={18}
              borderRadius='m'
              position='absolute'
              bottom={3}
              left={3}
              zIndex={10}
            />
            <Box
              backgroundColor='primaryCardBackground'
              width='100%'
              height={24}
              borderRadius='m'
              position='absolute'
              bottom={0}
              left={0}
              zIndex={5}
            />
          </Box>
        </Box>
        <Box>
          <Text variant='cardHeader'>{profile?.displayName}'s' Created Courses</Text>
          {createdCourses.map((course) => {
            return (
              <TouchableOpacity
                key={course.id}
                onPress={() =>
                  navigation.navigate("CourseDetails", { courseId: course.id, title: course.title })
                }
              >
                <Card
                  borderRadius='xs'
                  variant='primary'
                  flexDirection='row'
                  justifyContent='space-between'
                  style={{ backgroundColor: course.color }}
                >
                  <Text fontFamily='sora-medium'>{course.title}</Text>
                  <Icon name='arrow-forward' size={20} color='white' />
                </Card>
              </TouchableOpacity>
            );
          })}
        </Box>
      </Box>
      <BottomSheet
        ref={bottomSheetRef}
        handleIndicatorStyle={{ backgroundColor: foreground }}
        handleStyle={{
          paddingVertical: 16,
        }}
        style={{ zIndex: 10 }}
        backgroundStyle={{
          backgroundColor: bottomSheetBackground,
        }}
        index={bottomSheetActive ? 1 : -1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}
      >
        <SettingsList darkMode={darkMode} handleSetDarkMode={handleSetDarkMode} />
      </BottomSheet>
    </RestyledSafeAreaView>
  );
}
