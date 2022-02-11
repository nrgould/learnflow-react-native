export const SET_DARK_MODE = 'SET_DARK_MODE';

export function setDarkMode(darkMode: boolean) {
	return {
		type: SET_DARK_MODE,
		payload: darkMode,
	};
}
