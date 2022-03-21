import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { app } from '../firebase/config';
import { setUserProfileData } from './profileService';

const auth = getAuth(app);

interface SignInProps {
	email: string;
	password: string;
}

export async function signInWithEmail(creds: SignInProps) {
	return signInWithEmailAndPassword(auth, creds.email, creds.password).then(
		(userCred) => {
			console.log('signed in ', userCred.user.email);
		}
	);
}

export async function signOutFirebase() {
	return signOut(auth).then(() => {
		console.log('Sign Out Successful');
	});
}

interface RegisterProps {
	email: string;
	password: string;
	name: string;
}

export async function registerInFirebase(creds: RegisterProps) {
	try {
		const result = await createUserWithEmailAndPassword(
			auth,
			creds.email,
			creds.password
		);
		updateProfile(result.user, { displayName: creds.name });
		setUserProfileData(result.user);
	} catch (error: any) {
		console.log(error.message);
	}
}
