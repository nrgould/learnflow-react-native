import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useAppDispatch } from './reduxHooks';
import { setUserId } from '../store/authSlice';

const auth = getAuth();

export default function useAuthentication() {
	const [curUser, setCurUser] = useState<User>();
	const dispatch = useAppDispatch();

	useEffect(() => {
		return onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurUser(user);
				dispatch(setUserId(user.uid));
			} else {
				setCurUser(undefined);
			}
		});
	}, []);

	return {
		user: curUser,
	};
}
