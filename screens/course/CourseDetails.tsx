import { useEffect, useState, useCallback } from 'react';
import { NavigationTypes } from '../../types';
import Box from '../../components/atoms/Box';
import RestyledSafeAreaView from '../../components/atoms/RestyledSafeAreaView';
import Text from '../../components/atoms/Text';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
	clearCourse,
	fetchCourseAsync,
	followCourseAsync,
} from '../../store/courseSlice';
import RestyledScrollView from '../../components/atoms/RestyledScrollView';
import PageHeaderBack from '../../components/molecules/PageHeaderBack';
import ModuleContentItem from '../../components/molecules/CourseContentItem';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/atoms/Button';
import CircularProgressBar from '../../components/atoms/CircularProgressBar';
import { auth } from '../../firestore/authService';
import { SCREEN_WIDTH } from '../../theme/layout';
import CourseContentItem from '../../components/molecules/CourseContentItem';

export default function CourseDetails({ route }: NavigationTypes) {
	const title: string = route.params.title;
	// const id: string = route.params.id;
	const user = auth.currentUser;
	const dispatch = useAppDispatch();
	const course = useAppSelector((state) => state.course.selectedCourse);
	const status = useAppSelector((state) => state.course.status);
	const navigation = useNavigation<any>();
	const isFollowing = course?.followers.some(
		(follower) => follower.id === user!.uid
	);
	const [following, setFollowing] = useState(false);

	console.log('isFollowing', isFollowing);

	useEffect(() => {
		dispatch(fetchCourseAsync('i4wTZ9ioTEj7dte4O9Zb'));
		navigation.setOptions({
			headerShown: false,
			headerTitle: title,
		});

		return () => {
			dispatch(clearCourse());
		};
	}, [dispatch]);

	const onFollow = useCallback(() => {
		// setFollowing(!following);
		dispatch(followCourseAsync(course?.id!));
	}, [following]);

	if (status === 'loading') {
		return (
			<Box
				flex={1}
				alignItems='center'
				justifyContent='center'
				backgroundColor='background'>
				<Text variant='subheader'>Loading...</Text>
			</Box>
		);
	}

	if (status === 'failed') {
		return (
			<Box
				flex={1}
				alignItems='center'
				justifyContent='center'
				backgroundColor='background'>
				<Text variant='subheader' color='error'>
					Can't find this course!
				</Text>
			</Box>
		);
	}

	return (
		<RestyledSafeAreaView edges={['top', 'left', 'right']}>
			<RestyledScrollView
				style={{ minHeight: '100%' }}
				backgroundColor='background'>
				<Box paddingHorizontal='l'>
					<PageHeaderBack title={title} />
					<Box
						marginVertical='s'
						flexDirection='row'
						alignItems='center'
						justifyContent='space-between'>
						<Text
							style={{ maxWidth: 240 }}
							variant='body'
							numberOfLines={4}>
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
					flex={1}>
					<Button
						variant={isFollowing ? 'tertiary' : 'secondary'}
						label={isFollowing ? 'Unfollow' : 'Follow'}
						onPress={onFollow}
						width={SCREEN_WIDTH * 0.42}
					/>
					<Button
						variant='primary'
						label='Start Learning'
						onPress={() => navigation.navigate('ModuleFeed')}
						width={SCREEN_WIDTH * 0.42}
					/>
				</Box>
				<Box marginHorizontal='l' height='100%'>
					{course?.content.map((module, i) => {
						return <CourseContentItem key={i} module={module} />;
					})}
				</Box>
			</RestyledScrollView>
		</RestyledSafeAreaView>
	);
}
