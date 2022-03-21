import { createTheme } from '@shopify/restyle';
import { Dimensions } from 'react-native';

const palette = {
	pink: '#CE2D4F',

	blue: '#008BF8',
	darkBlue: '#094074',
	purple: '#6E6BC7',
	aqua: '#04A777',
	brown: '#FB8B24',

	lightPink: '#f4cdd5',
	lightBlue: '#e7f3fd',

	gray: '#E1dfe9',
	lightGray: '#dbdbdb',
	blueGray: '#b4bdd7',
	dimGray: '#666666',

	black: '#161314',
	offBlack: '#211C1E',
	pureBlack: '#000',

	white: '#fff',
	offWhite: '#f9f9f9',
	darkLiver: '#4D4246',

	secondaryText: '#9da4ba',
	secondaryTextSoft: '#e7e9ee',
	primaryTextSoft: '#d1d1d1',

	gradientStart: '#eeeff3',
	gradientEnd: '#e6e6ee',

	green: '#37bc64',
	lightGreen: '#E2f8E9',

	red: '#DE5050',
	lightRed: '#FFEBEB',

	yellow: '#F9AE3F',
	lightYellow: '#FFF8DE',

	// black: '#0B0B0B',
	// white: '#F0F2F3',
};

const theme = createTheme({
	colors: {
		//text
		primaryText: palette.offBlack,
		secondaryText: palette.darkLiver,
		buttonText: palette.white,
		buttonTextBlack: palette.black,
		whiteText: palette.white,

		//primary / secondary
		primary: palette.pink,
		primarySoft: palette.lightPink,
		secondary: palette.blue,
		secondarySoft: palette.lightBlue,
		secondaryDark: palette.darkBlue,
		tertiary: palette.aqua,
		tertiarySoft: palette.aqua,
		grayBtn: palette.darkLiver,
		whiteBtn: palette.offWhite,

		//status colors
		success: palette.green,
		successSoft: palette.lightGreen,
		warning: palette.yellow,
		warningSoft: palette.lightYellow,
		error: palette.red,
		errorSoft: palette.lightRed,
		disabled: palette.gray,

		//component colors
		activeIcon: palette.offBlack,
		background: palette.offWhite,
		foreground: palette.black,
		inputBackground: palette.white,
		primaryCardBackground: palette.white,
		secondaryCardBackground: palette.offBlack,
		border: palette.lightGray,
		shadow: palette.black,
		icon: palette.blueGray,
	},
	spacing: {
		none: 0,
		xs: 4,
		s: 8,
		m: 16,
		l: 24,
		xl: 40,
		xxl: 60,
	},
	textVariants: {
		header: {
			fontSize: 36,
			color: 'primaryText',
			fontFamily: 'poppins-bold',
		},
		headerTitle: {
			fontSize: 18,
			color: 'primaryText',
			fontFamily: 'poppins-bold',
			zIndex: 5,
			marginBottom: 's',
		},
		subheader: {
			fontSize: 24,
			fontWeight: '600',
			color: 'primaryText',
			fontFamily: 'poppins-medium',
		},
		cardHeader: {
			fontSize: 20,
			fontWeight: '600',
			color: 'primaryText',
			fontFamily: 'poppins-medium',
		},
		stat: {
			fontSize: 36,
			color: 'primaryText',
			fontFamily: 'poppins-bold',
		},
		body: {
			fontSize: 16,
			color: 'primaryText',
			fontFamily: 'poppins-regular',
		},
		pageHeader: {
			position: 'absolute',
			top: 50,
			left: 25,
			fontSize: 36,
			color: 'primaryText',
			fontFamily: 'poppins-bold',
		},
		button_primary: {
			color: 'buttonText',
			fontFamily: 'poppins-medium',
			fontSize: 16,
		},
		button_secondary: {
			color: 'buttonText',
			fontFamily: 'poppins-medium',
			fontSize: 16,
		},
		button_tertiary: {
			color: 'buttonText',
			fontFamily: 'poppins-medium',
			fontSize: 16,
		},
		button_success: {
			color: 'buttonText',
			fontFamily: 'poppins-medium',
			fontSize: 16,
		},
		button_successSecondary: {
			color: 'success',
			fontFamily: 'poppins-medium',
			fontSize: 16,
		},
		button_warning: {
			color: 'buttonText',
			fontFamily: 'poppins-medium',
			fontSize: 16,
		},
		button_warningSecondary: {
			color: 'warning',
			fontFamily: 'poppins-medium',
			fontSize: 16,
		},
		button_error: {
			color: 'buttonText',
			fontFamily: 'poppins-medium',
			fontSize: 16,
		},
		button_errorSecondary: {
			color: 'error',
			fontFamily: 'poppins-medium',
			fontSize: 16,
		},
		button_link: {
			color: 'secondaryText',
			fontFamily: 'poppins-medium',
			fontSize: 16,
		},
		questionButtonText: {
			color: 'whiteText',
			fontFamily: 'poppins-bold',
			fontSize: 20,
		},
		questionText: {
			fontFamily: 'poppins-semibold',
			fontSize: 20,
			color: 'primaryText',
		},
	},
	cardVariants: {
		primary: {
			backgroundColor: 'primaryCardBackground',
			shadowColor: 'shadow',
			shadowOffset: { width: 2, height: 3 },
			shadowOpacity: 0.1,
			shadowRadius: 20,
			borderRadius: 'm',
			marginTop: 'm',
			justifyContent: 'center',
			padding: 'm',
			position: 'relative',
		},
		secondary: {
			backgroundColor: 'secondaryCardBackground',
			shadowOpacity: 0.1,
			borderRadius: 'm',
			marginTop: 'xl',
			alignItems: 'center',
			justifyContent: 'center',
			padding: 'm',
		},
		questionBox: {
			backgroundColor: 'secondary',
			borderRadius: 's',
			shadowColor: 'secondaryDark',
			shadowOffset: { width: 0, height: 4 },
			shadowOpacity: 1,
			shadowRadius: 0,
			justifyContent: 'center',
			// margin: 'xs',
			// marginHorizontal: 's',
		},
		answerBox: {
			backgroundColor: 'primaryCardBackground',
			borderRadius: 's',
			borderColor: 'border',
			borderWidth: 2,
			justifyContent: 'center',
		},
		optionBox: {
			backgroundColor: 'primary',
			borderRadius: 's',
			shadowColor: 'secondaryDark',
			shadowOffset: { width: 0, height: 4 },
			// shadowOpacity: 1,
			shadowRadius: 0,
			justifyContent: 'center',
			margin: 'xs',
		},
	},
	buttonVariants: {
		primary: {
			backgroundColor: 'primary',
			fontFamily: 'Poppins',
			shadowColor: 'shadow',
			shadowOffset: { width: 1, height: 2 },
			borderRadius: 'xs',
			shadowOpacity: 0.1,
			shadowRadius: 6,
			elevation: 5,
		},
		secondary: {
			backgroundColor: 'secondary',
			borderRadius: 'xs',
		},
		tertiary: {
			backgroundColor: 'grayBtn',
			borderRadius: 'xs',
		},
		disabled: {
			backgroundColor: 'disabled',
			borderRadius: 'xs',
			shadowColor: 'shadow',
			shadowOffset: { width: 1, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 6,
			elevation: 5,
		},
		success: {
			backgroundColor: 'success',
			borderRadius: 'xs',
			shadowColor: 'shadow',
			shadowOffset: { width: 1, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 6,
			elevation: 5,
		},
		successSecondary: {
			backgroundColor: 'successSoft',
			borderRadius: 'xs',
		},
		warning: {
			backgroundColor: 'warning',
			borderRadius: 'xs',
			shadowColor: 'shadow',
			shadowOffset: { width: 1, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 6,
			elevation: 5,
		},
		warningSecondary: {
			backgroundColor: 'warningSoft',
			borderRadius: 'xs',
		},
		error: {
			backgroundColor: 'error',
			borderRadius: 'xs',
			shadowColor: 'shadow',
			shadowOffset: { width: 1, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 6,
			elevation: 5,
		},
		errorSecondary: {
			backgroundColor: 'errorSoft',
			borderRadius: 'xs',
		},
		link: {
			// backgroundColor: 'none',
			marginBottom: 's',
		},
	},
	inputVariants: {
		primary: {
			borderWidth: 1,
			borderColor: 'border',
			fontFamily: 'poppins-regular',
			padding: 'm',
			borderRadius: 's',
			color: 'primaryText',
			fontSize: 16,
			fontWeight: '600',
			backgroundColor: 'inputBackground',
			minWidth: 200,
			maxWidth: Dimensions.get('window').width * 0.6,
		},
		underline: {
			borderBottomWidth: 1,
			borderColor: 'border',
			padding: 'm',
			paddingLeft: 'xs',
			color: 'primaryText',
			fontSize: 16,
			fontWeight: '500',
		},
		search: {
			borderWidth: 1,
			borderColor: 'border',
			fontFamily: 'poppins-regular',
			padding: 's',
			borderRadius: 's',
			fontSize: 16,
			fontWeight: '600',
			backgroundColor: 'inputBackground',
			minWidth: 200,
		},
	},
	breakpoints: {
		phone: 0,
		tablet: 768,
		smallDevice: 700,
	},
	constants: {
		bottomTabHeightSmall: 50,
		bottomTabHeightLarge: 75,
	},
	borderRadii: {
		xs: 4,
		s: 8,
		m: 12,
		l: 24,
		xl: 48,
	},
});

export const darkTheme = createTheme({
	...theme,
	colors: {
		...theme.colors,
		primaryText: palette.offWhite,
		secondaryText: palette.primaryTextSoft,
		background: palette.black,
		foreground: palette.white,
		inputBackground: palette.offBlack,
		icon: palette.dimGray,
		activeIcon: palette.gray,
		primaryCardBackground: palette.offBlack,
		secondaryCardBackground: palette.offWhite,
		border: palette.dimGray,
	},
});

export type Theme = typeof theme;
export default theme;
