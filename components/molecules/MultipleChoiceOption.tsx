import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { OPTIONS_BOX_HEIGHT, OPTIONS_BOX_WIDTH } from '../../theme/layout';
import { Option } from '../../types';
import Box from '../atoms/Box';
import Card from '../atoms/Card';
import Text from '../atoms/Text';

interface Props extends Option {
	onAnswer: (id: string) => void;
}

export default function MultipleChoiceOption({
	content,
	isAnswer,
	id,
	onAnswer,
}: Props) {
	console.log(content, isAnswer);
	return (
		<TouchableOpacity onPress={() => onAnswer(id)}>
			<Card
				variant='optionBox'
				width={OPTIONS_BOX_WIDTH}
				height={OPTIONS_BOX_HEIGHT}
				alignItems={'center'}
				justifyContent='center'>
				<Text variant='questionButtonText'>{content}</Text>
			</Card>
		</TouchableOpacity>
	);
}
