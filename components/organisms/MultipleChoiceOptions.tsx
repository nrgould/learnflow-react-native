import React from 'react';
import { OPTIONS_HEIGHT } from '../../theme/layout';
import { Option } from '../../types';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import MultipleChoiceOption from '../molecules/MultipleChoiceOption';

interface Props {
	options: Option[];
	onAnswer: (id: string) => void;
}

export default function MultipleChoiceOptions({ options, onAnswer }: Props) {
	return (
		<Box
			flexDirection={'column'}
			height={OPTIONS_HEIGHT}
			alignItems='center'
			justifyContent={'center'}>
			<Text variant='body' marginBottom='l'>
				Select an option:
			</Text>
			{options.map(({ id, content, isAnswer }, index) => (
				<MultipleChoiceOption
					key={index}
					content={content}
					isAnswer={isAnswer}
					onAnswer={onAnswer}
					id={id}
				/>
			))}
			<Text variant='body' marginTop='l'>
				Skip
			</Text>
		</Box>
	);
}
