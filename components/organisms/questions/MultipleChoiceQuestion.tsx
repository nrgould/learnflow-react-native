import { useTheme } from '@shopify/restyle';
import React, { useEffect, useMemo, useState } from 'react';
import { useItemHeight } from '../../../hooks/useItemHeight';
import { MAX_ATTEMPTS } from '../../../theme/constants';
import { Theme } from '../../../theme/theme';
import { Option } from '../../../types';
import { errorHaptic, successHaptic } from '../../../util/hapticFeedback';
import { shuffle } from '../../../util/shuffle';
import Box from '../../atoms/Box';
import MultipleChoiceOptions from './MultipleChoiceOptions';
import MultipleChoiceQuestionHeader from './MultipleChoiceQuestionHeader';

interface Props {
	question: string;
	options: Option[];
}

export default function MultipleChoiceQuestion({ question, options }: Props) {
	const theme = useTheme<Theme>();
	const [disabled, setDisabled] = useState(false);
	const [opts, setOpts] = useState(options);
	const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
	const [attempts, setAttempts] = useState(MAX_ATTEMPTS);
	const [statusMessage, setStatusMessage] = useState('');
	const [statusColor, setStatusColor] = useState(theme.colors.primaryText);
	const height = useItemHeight();

	useEffect(() => {
		const shuffledOptions = shuffle(options);
		setOpts(shuffledOptions);
	}, []);

	//memoized so order doesn't reshuffle on re-render
	const MemoizedMultipleChoiceOptions = useMemo(
		() => MultipleChoiceOptions,
		[]
	);

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
				<MemoizedMultipleChoiceOptions
					disabled={disabled}
					onAnswer={onAnswer}
					options={opts}
					selectedOptions={selectedOptions}
				/>
			</Box>
		</Box>
	);
}
