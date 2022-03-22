import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

const auth = getAuth();

export default function useAuthentication() {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		return onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(undefined);
			}
		});
	}, []);

	return {
		user,
	};
}
