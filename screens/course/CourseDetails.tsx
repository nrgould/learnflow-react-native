import { useEffect } from "react";
import { NavigationTypes } from "../../types";
import Box from "../../components/atoms/Box";
import RestyledSafeAreaView from "../../components/atoms/RestyledSafeAreaView";
import Text from "../../components/atoms/Text";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { clearCourse } from "../../store/courseSlice";
import RestyledScrollView from "../../components/atoms/RestyledScrollView";
import PageHeaderBack from "../../components/molecules/PageHeaderBack";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/atoms/Button";
import CircularProgressBar from "../../components/atoms/CircularProgressBar";
import { SCREEN_WIDTH } from "../../theme/layout";
import CourseContentItem from "../../components/molecules/CourseContentItem";
import {
  fetchCourseAsync,
  fetchFollowingCourseAsync,
  followCourseAsync,
} from "../../store/actions/courseActions";
import { FlatGrid } from "react-native-super-grid";

const ITEM_WIDTH = SCREEN_WIDTH * 0.42;

export default function CourseDetails({ route }: NavigationTypes) {
  const title: string = route.params.title;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.currentUser);
  const userId = useAppSelector((state) => state.auth.userId);
  const course = useAppSelector((state) => state.course.selectedCourse);
  const status = useAppSelector((state) => state.course.status);
  const followingStatus = useAppSelector((state) => state.course.followingStatus);
  const isFollowing = useAppSelector((state) => state.course.followingSelectedCourse);
  const navigation = useNavigation<any>();

  const courseId = route.params.courseId;

  useEffect(() => {
    dispatch(
      fetchCourseAsync({
        courseId: courseId || "i4wTZ9ioTEj7dte4O9Zb",
        userId,
      })
    );
    dispatch(
      fetchFollowingCourseAsync({
        courseId: courseId || "i4wTZ9ioTEj7dte4O9Zb",
        userId,
      })
    );
    navigation.setOptions({
      headerShown: false,
      headerTitle: title,
    });

    return () => {
      dispatch(clearCourse());
    };
  }, [dispatch]);

  const onFollow = () => {
    dispatch(
      followCourseAsync({
        courseId: courseId || "i4wTZ9ioTEj7dte4O9Zb",
        user: user!,
        isFollowing: isFollowing!!,
      })
    );
  };

  if (status === "loading") {
    return (
      <Box flex={1} alignItems='center' justifyContent='center' backgroundColor='background'>
        <Text variant='subheader'>Loading...</Text>
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Box flex={1} alignItems='center' justifyContent='center' backgroundColor='background'>
        <Text variant='subheader' color='error'>
          Can't find this course!
        </Text>
      </Box>
    );
  }

  return (
    <RestyledSafeAreaView edges={["top", "left", "right"]}>
      <RestyledScrollView style={{ minHeight: "100%" }} backgroundColor='background'>
        <Box paddingHorizontal='l'>
          <PageHeaderBack title={title} />
          <Box
            marginVertical='s'
            flexDirection='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Text style={{ maxWidth: 240 }} variant='body' numberOfLines={4}>
              {course?.description}
            </Text>
            <CircularProgressBar
              completedContent={course?.completedContent!}
              totalContent={course?.totalContent!}
              color={course?.color}
            />
          </Box>
        </Box>
        <Box
          paddingHorizontal='l'
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
          width='100%'
          flex={1}
        >
          <Button
            variant={isFollowing ? "outline" : "secondary"}
            label={isFollowing ? "Unfollow" : "Follow"}
            onPress={onFollow}
            width={SCREEN_WIDTH * 0.42}
            loading={followingStatus === "loading"}
          />
          <Button
            variant='primary'
            label={"Start Learning"}
            onPress={() => console.log("go to feed")}
            width={SCREEN_WIDTH * 0.42}
          />
        </Box>
        <Box marginHorizontal='l' flexDirection='row' flexWrap='wrap' height='100%'>
          {!course?.content && <Text>No content in this course.</Text>}
          {course?.content && (
            <FlatGrid
              itemDimension={ITEM_WIDTH}
              data={course!.content}
              renderItem={({ item }) => <CourseContentItem module={item} />}
            />
          )}
          {/* {course?.content.map((module, i) => {
            return <CourseContentItem key={i} module={module} />;
          })} */}
        </Box>
      </RestyledScrollView>
    </RestyledSafeAreaView>
  );
}
