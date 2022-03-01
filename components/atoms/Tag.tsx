import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Box from './Box';
import Text from './Text';

interface Props {
	text: string;
	navigation: any;
}

export default function Tag({ text, navigation }: Props) {
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
