import { MODULES } from '../../data/dummy-data';
import { ModuleType } from '../../types';
import {
	asyncActionError,
	asyncActionFinish,
	asyncActionStart,
} from '../reducers/asyncReducer';

export const FETCH_MODULE = 'FETCH_MODULE';
export const CLEAR_SELECTED_MODULE = 'CLEAR_SELECTED_MODULE';

export function fetchModule() {
	return async function (dispatch: any) {
		dispatch(asyncActionStart());
		try {
			const module = MODULES[0];
			dispatch({
				type: FETCH_MODULE,
				payload: module,
			});
			dispatch(asyncActionFinish());
		} catch (error) {
			dispatch(asyncActionError(error));
		}
	};
}
