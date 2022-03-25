import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Box from './Box';
import Text from './Text';

interface Props {
	text: string;
}

export default function Tag({ text }: Props) {
	const navigation = useNavigation<any>();
	function navigateTagHandler() {
		navigation.navigate('ModuleDetails', { title: text });
	}

	return (
		<TouchableOpacity onPress={navigateTagHandler}>
			<Box
				borderColor='border'
				borderWidth={1}
				borderRadius='l'
				backgroundColor='background'
				marginRight='s'
				marginBottom='s'>
				<Text padding='s' paddingHorizontal='m' color='secondaryText'>
					{text}
				</Text>
			</Box>
		</TouchableOpacity>
	);
}
