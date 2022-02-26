import { useTheme } from '@shopify/restyle';
import React from 'react';
import Box from '../components/atoms/Box';
import RestyledSafeAreaView from '../components/atoms/RestyledSafeAreaView';
import RestyledScrollView from '../components/atoms/RestyledScrollView';
import Text from '../components/atoms/Text';
import PathModule from '../components/molecules/PathModule';
import { Theme } from '../theme/theme';
import { NavigationTypes } from '../types';

interface Props extends NavigationTypes {}

export default function Path({ navigation }: Props) {
	const theme = useTheme<Theme>();
	const { primary, secondary, tertiary } = theme.colors;
	return (
		<RestyledSafeAreaView>
			<RestyledScrollView
				style={{ minHeight: '100%' }}
				backgroundColor='background'>
				<Box height='100%' backgroundColor='background'>
					<Box marginTop='s' marginHorizontal='l'>
						<Text variant='header'>My Learning</Text>
						<PathModule
							completedContent={32}
							totalContent={107}
							progressColor={primary}
							navigation={navigation}
						/>
						<PathModule
							completedContent={73}
							totalContent={135}
							progressColor={secondary}
							navigation={navigation}
						/>
						<PathModule
							completedContent={87}
							totalContent={112}
							progressColor={tertiary}
							navigation={navigation}
						/>
					</Box>
				</Box>
			</RestyledScrollView>
		</RestyledSafeAreaView>
	);
}
