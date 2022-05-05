import React, { useState } from 'react';
import FeedItemContent from '../molecules/FeedItemContent';
import { ModuleType } from '../../types';
import Animated from 'react-native-reanimated';
import MultipleChoiceQuestion from './questions/MultipleChoiceQuestion';

interface Props {
	index: number;
	translateY?: Animated.SharedValue<number>;
	answered?: boolean;
	setAnswered?: React.Dispatch<React.SetStateAction<boolean>>;
	module: ModuleType;
	currentVisibleIndex: number;
	videoPaused: boolean;
	setVideoPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FeedItem({
	index,
	module,
	currentVisibleIndex,
	videoPaused,
	setVideoPaused,
}: Props) {
	const [liked, setLiked] = useState(false);

	return (
    <>
      <FeedItemContent
        videoPaused={videoPaused}
        setVideoPaused={setVideoPaused}
        liked={liked}
        setLiked={setLiked}
        currentVisibleIndex={currentVisibleIndex}
        index={index}
        videoURL={module.videoUrl}
      />
      <MultipleChoiceQuestion
        question={module.question.questionText}
        options={module.question.questionOptions}
        attempts={module.question.attempts}
      />
    </>
  );
}
