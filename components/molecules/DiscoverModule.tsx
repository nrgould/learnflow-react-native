import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Theme } from '../../theme/theme';
import { ModuleType } from '../../types';
import Box from '../atoms/Box';
import Card from '../atoms/Card';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

interface Props {
	module: ModuleType;
}

export default function DiscoverModule({ module }: Props) {
	const [followed, setFollowed] = useState(false);
	const navigation = useNavigation<any>();
	const { title, description, color, id } = module;

	function navigationHandler() {
		navigation.navigate('ModuleDetails', { title, id });
	}

	return (
		<Box marginRight='l'>
			<TouchableOpacity onPress={navigationHandler}>
				<Card
					maxWidth={280}
					width={280}
					variant='secondary'
					style={{ backgroundColor: color }}>
					<Box
						flexDirection='row'
						justifyContent='space-between'
						alignItems='flex-start'>
						<Text variant='cardHeader'>{title}</Text>
					</Box>
					<Text
						marginTop='s'
						variant='body'
						style={{ maxWidth: 200 }}
						numberOfLines={2}
						color='secondaryText'>
						{description}
					</Text>
				</Card>
			</TouchableOpacity>
			<Box position='absolute' zIndex={100} bottom={5} right={5}>
				<Icon
					color='white'
					name={followed ? 'checkmark-circle' : 'add-circle'}
					size={42}
					onPress={() => setFollowed(!followed)}
				/>
			</Box>
		</Box>
	);
}
