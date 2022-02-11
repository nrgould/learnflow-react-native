import { createTheme } from '@shopify/restyle';

const palette = {
	pink: '#CE2D4F',
	blue: '#094074',

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
		secondaryText: palette.secondaryText,
		buttonText: palette.white,
		buttonTextBlack: palette.black,

		//primary / secondary
		primary: palette.pink,
		primarySoft: palette.lightPink,
		secondary: palette.blue,
		secondarySoft: palette.lightBlue,

		//status colors
		success: palette.green,
		successSoft: palette.lightGreen,
		warning: palette.yellow,
		warningSoft: palette.lightYellow,
		error: palette.red,
		errorSoft: palette.lightRed,
		disabled: palette.gray,

		//component colors
		icon: palette.blueGray,
		activeIcon: palette.offBlack,
		background: palette.offWhite,
		foreground: palette.black,
		primaryCardBackground: palette.white,
		secondaryCardBackground: palette.offBlack,
		border: palette.lightGray,
		shadow: palette.black,
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
			fontFamily: 'PoppinsBold',
		},
		subheader: {
			fontSize: 24,
			fontWeight: '600',
			color: 'primaryText',
			fontFamily: 'PoppinsMedium',
		},
		cardHeader: {
			fontSize: 20,
			fontWeight: '600',
			color: 'primaryText',
			position: 'absolute',
			top: 12,
			left: 16,
			paddingBottom: 'xl',
			// fontFamily: 'PoppinsMedium'
		},
		body: {
			fontSize: 16,
			color: 'primaryText',
			fontFamily: 'Poppins',
		},
		pageHeader: {
			position: 'absolute',
			top: 50,
			left: 25,
			fontSize: 36,
			// fontWeight: 'bold',
			fontFamily: 'PoppinsBold',
		},
		button_primary: {
			color: 'buttonText',
			fontSize: 16,
		},
		button_secondary: {
			color: 'buttonTextBlack',
			fontSize: 16,
		},
		button_success: {
			color: 'buttonText',
			fontSize: 16,
		},
		button_successSecondary: {
			color: 'success',
			fontSize: 16,
		},
		button_warning: {
			color: 'buttonText',
			fontSize: 16,
		},
		button_warningSecondary: {
			color: 'warning',
			fontSize: 16,
		},
		button_error: {
			color: 'buttonText',
			fontSize: 16,
		},
		button_errorSecondary: {
			color: 'error',
			fontSize: 16,
		},
		button_link: {
			color: 'secondaryText',
			fontSize: 16,
		},
		assignment_date: {
			fontSize: 18,
			color: 'primaryText',
			fontFamily: 'PoppinsMedium',
		},
		assignment_title: {
			fontSize: 18,
			color: 'primaryText',
			fontFamily: 'PoppinsMedium',
		},
		assignment_course: {
			fontSize: 15,
			color: 'primaryText',
			fontFamily: 'Poppins',
		},
	},
	cardVariants: {
		primary: {
			backgroundColor: 'primaryCardBackground',
			shadowColor: 'shadow',
			shadowOffset: { width: 2, height: 3 },
			shadowOpacity: 0.1,
			shadowRadius: 20,
			borderRadius: 16,
			marginTop: 'xl',
			justifyContent: 'center',
			padding: 'm',
			paddingTop: 'xl',
			position: 'relative',
		},
		secondary: {
			backgroundColor: 'secondaryCardBackground',
			shadowOpacity: 0.1,
			borderRadius: 12,
			marginTop: 'xl',
			alignItems: 'center',
			justifyContent: 'center',
			padding: 'm',
		},
	},
	buttonVariants: {
		primary: {
			backgroundColor: 'primary',
			fontFamily: 'Poppins',
			shadowColor: 'shadow',
			shadowOffset: { width: 1, height: 2 },
			borderRadius: 6,
			shadowOpacity: 0.1,
			shadowRadius: 6,
			elevation: 5,
		},
		secondary: {
			backgroundColor: 'secondarySoft',
			borderRadius: 6,
		},
		disabled: {
			backgroundColor: 'disabled',
			borderRadius: 12,
			shadowColor: 'shadow',
			shadowOffset: { width: 1, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 6,
			elevation: 5,
		},
		success: {
			backgroundColor: 'success',
			borderRadius: 12,
			shadowColor: 'shadow',
			shadowOffset: { width: 1, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 6,
			elevation: 5,
		},
		successSecondary: {
			backgroundColor: 'successSoft',
			borderRadius: 12,
		},
		warning: {
			backgroundColor: 'warning',
			borderRadius: 12,
			shadowColor: 'shadow',
			shadowOffset: { width: 1, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 6,
			elevation: 5,
		},
		warningSecondary: {
			backgroundColor: 'warningSoft',
			borderRadius: 12,
		},
		error: {
			backgroundColor: 'error',
			borderRadius: 12,
			shadowColor: 'shadow',
			shadowOffset: { width: 1, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 6,
			elevation: 5,
		},
		errorSecondary: {
			backgroundColor: 'errorSoft',
			borderRadius: 12,
		},
		link: {
			background: 'none',
			marginBottom: 's',
		},
	},
	inputVariants: {
		primary: {
			borderWidth: 1,
			borderColor: 'border',
			padding: 'm',
			borderRadius: 8,
			color: 'primaryText',
			fontSize: 16,
			fontWeight: '600',
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
	},
	breakpoints: {
		phone: 0,
		tablet: 768,
	},
});

export const darkTheme = createTheme({
	...theme,
	colors: {
		...theme.colors,
		primaryText: palette.offWhite,
		background: palette.black,
		foreground: palette.white,
		icon: palette.dimGray,
		activeIcon: palette.gray,
		primaryCardBackground: palette.offBlack,
		secondaryCardBackground: palette.offWhite,
		border: palette.darkLiver,
	},
});

export type Theme = typeof theme;
export default theme;
