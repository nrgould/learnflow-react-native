import { useTheme } from '@shopify/restyle';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { OPTIONS_BOX_HEIGHT, OPTIONS_BOX_WIDTH } from '../../theme/layout';
import { Theme } from '../../theme/theme';
import { Option } from '../../types';
import Card from '../atoms/Card';
import Text from '../atoms/Text';

interface Props extends Option {
	onAnswer: (id: string) => void;
	disabled: boolean;
	selectedOptions: Option[];
}

export default function MultipleChoiceOption({
	content,
	isAnswer,
	disabled,
	id,
	onAnswer,
	selectedOptions,
}: Props) {
	const theme = useTheme<Theme>();
	const selected = selectedOptions.some((option) => option.id === id);

	let backgroundColor = theme.colors.primary;

	if (selected && isAnswer) {
		backgroundColor = theme.colors.success;
	} else if (selected) {
		backgroundColor = theme.colors.disabled;
	}

	return (
		<TouchableOpacity
			disabled={disabled || selected}
			onPress={() => onAnswer(id)}>
			<Card
				variant='optionBox'
				width={OPTIONS_BOX_WIDTH}
				height={OPTIONS_BOX_HEIGHT}
				alignItems={'center'}
				style={{ backgroundColor }}
				justifyContent='center'>
				<Text variant='questionButtonText'>{content}</Text>
			</Card>
		</TouchableOpacity>
	);
}
