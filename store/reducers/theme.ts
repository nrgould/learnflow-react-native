import { ActionTypes, ThemeState } from '../../types';
import { SET_DARK_MODE } from '../actions/theme';

const initialState: ThemeState = {
	darkMode: true,
};

export function themeReducer(
	state = initialState,
	{ type, payload }: ActionTypes
) {
	switch (type) {
		case SET_DARK_MODE:
			return {
				...state,
				darkMode: payload,
			};
		default:
			return state;
	}
}
