import React from 'react';
import Card from '../atoms/Card';
import Box from '../atoms/Box';
import { isSmallDevice, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../theme/layout';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/theme';

const CIRCLE_LENGTH = isSmallDevice ? 190 : 210;
const R = isSmallDevice ? 35 : CIRCLE_LENGTH / (2 * Math.PI);
const STROKE_WIDTH = 9;

export default function PathModulePlaceholder() {
	const theme = useTheme<Theme>();
	const cardHeight = SCREEN_HEIGHT / 8;

	const { border } = theme.colors;
	return (
		<Card
			variant='primary'
			marginVertical='xs'
			width={SCREEN_WIDTH * 0.9}
			style={{ height: cardHeight }}>
			<Box
				position='relative'
				flexDirection='row'
				alignItems='center'
				justifyContent='space-between'>
				<Box
					height={cardHeight}
					flexDirection='column'
					alignItems='flex-start'
					justifyContent='space-around'>
					<Box
						width={100}
						height={14}
						backgroundColor='border'
						borderRadius='xs'
					/>
					<Box
						width={180}
						height={12}
						backgroundColor='border'
						borderRadius='xs'
					/>
				</Box>
				<Box alignItems='center' justifyContent='center'>
					<Svg
						viewBox='0 0 100 100'
						height={cardHeight}
						width={cardHeight}>
						<Circle
							cx='50'
							cy='50'
							r={R}
							stroke={border}
							strokeWidth={STROKE_WIDTH}
						/>
					</Svg>
				</Box>
			</Box>
		</Card>
	);
}
