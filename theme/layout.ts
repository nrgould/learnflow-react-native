import { Dimensions } from 'react-native';
import { Answer } from '../components/organisms/QuestionOptions';
import { Offset } from '../types';
import theme from './theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const isSmallDevice = SCREEN_HEIGHT < theme.breakpoints.smallDevice;
const bottomTabHeight = isSmallDevice
	? theme.constants.bottomTabHeightSmall
	: theme.constants.bottomTabHeightLarge;

export const MARGIN = 16;

export const ANSWER_BOX_WIDTH = (SCREEN_WIDTH - MARGIN * 2) / 4;
export const ANSWER_BOX_HEIGHT = ANSWER_BOX_WIDTH;

export const CONTENT_WIDTH = SCREEN_WIDTH - MARGIN * 2;

export const ANSWER_HEIGHT = SCREEN_HEIGHT * 0.4;
export const OPTIONS_HEIGHT = SCREEN_HEIGHT * 0.6 - bottomTabHeight;

// export const calculateLayout = (offsets: Offset[]) => {
// 	Offsets.forEach((answer, index) => {
// 		let total = 0;
// 	});
// };
