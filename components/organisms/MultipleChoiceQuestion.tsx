import { useTheme } from '@shopify/restyle';
import React, { useState } from 'react';
import { useItemHeight } from '../../hooks/useItemHeight';
import { Theme } from '../../theme/theme';
import { Option } from '../../types';
import { errorHaptic, successHaptic } from '../../util/hapticFeedback';
import Box from '../atoms/Box';
import MultipleChoiceOptions from './MultipleChoiceOptions';
import MultipleChoiceQuestionHeader from './MultipleChoiceQuestionHeader';

interface Props {
	question: string;
	options: any[];
}

export default function MultipleChoiceQuestion({ question, options }: Props) {
	const theme = useTheme<Theme>();
	const [disabled, setDisabled] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
	const [attempts, setAttempts] = useState(3);
	const [statusMessage, setStatusMessage] = useState('');
	const [statusColor, setStatusColor] = useState(theme.colors.primaryText);
	const height = useItemHeight();

	const onAnswer = (id: string) => {
		const answer = options.find((option: Option) => option.id === id);

		const newSelected = [...selectedOptions, answer];
		setSelectedOptions(newSelected as Option[]);
		setAttempts(attempts - 1);

		if (answer?.isAnswer) {
			//correct
			setStatusColor(theme.colors.success);
			setStatusMessage('Correct!');
			setDisabled(true);
			successHaptic();
		} else if (attempts > 1) {
			//wrong but more attempts
			setStatusColor(theme.colors.error);
			setStatusMessage('Try again');
			errorHaptic();
		} else {
			// wrong and out of attempts
			setStatusColor(theme.colors.error);
			setStatusMessage('Maybe try a different question.');
			setDisabled(true);
		}
	};

	return (
		<Box height={height} backgroundColor='background'>
			<Box position='relative' marginHorizontal={'l'} flex={1}>
				<MultipleChoiceQuestionHeader
					attempts={attempts}
					question={question}
					statusMessage={statusMessage}
					statusColor={statusColor}
				/>
				<MultipleChoiceOptions
					disabled={disabled}
					onAnswer={onAnswer}
					options={options}
					selectedOptions={selectedOptions}
				/>
			</Box>
		</Box>
	);
}
