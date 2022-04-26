import {
	createUserWithEmailAndPassword,
	initializeAuth,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { app } from '../firebase/config';
import { setUserProfileData } from './profileService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Provide it to initializeAuth.
export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});

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
		console.log(result);
		updateProfile(result.user, { displayName: creds.name });
		setUserProfileData(result.user);
	} catch (error: any) {
		console.log(error.message);
	}
}
