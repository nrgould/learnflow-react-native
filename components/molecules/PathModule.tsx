import React from 'react';
import Card from '../atoms/Card';
import Box from '../atoms/Box';
import Text from '../atoms/Text';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/theme';

export default function PathModule() {
	const theme = useTheme<Theme>();
	// const { width, height } = useWindowDimensions();

	const { primary, background } = theme.colors;
	return (
		<Card variant='primary' marginVertical='s'>
			<Box flexDirection='row' alignItems='flex-end'>
				<Box>
					<Text variant='cardHeader'>Algebra</Text>
					<Box
						alignItems='flex-start'
						justifyContent='center'
						marginTop='m'>
						<Text variant='body'>97 / 212 Fragments</Text>
						<Text variant='body'>45% Complete</Text>
					</Box>
				</Box>
				<Svg>
					<Circle
						cx={150}
						cy={45}
						r={30}
						stroke={background}
						strokeWidth={16}
					/>
					<Circle
						cx={150}
						cy={45}
						r={30}
						stroke={primary}
						strokeWidth={10}
					/>
				</Svg>
			</Box>
		</Card>
	);
}
