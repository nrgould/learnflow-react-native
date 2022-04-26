import {
	doc,
	getDoc,
	getFirestore,
	setDoc,
	Timestamp,
} from 'firebase/firestore/lite';
import { app } from '../firebase/config';
import { User } from 'firebase/auth';

const db = getFirestore(app);

export async function getUserProfile(userId: string) {
	console.log('getting user profile');
	const docRef = doc(db, 'users', userId);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		console.log("document doesn't exist!");
		return null;
	}
}

export function setUserProfileData(user: any) {
	const docRef = doc(db, 'users', user.uid);

	setDoc(docRef, {
		displayName: user.name,
		email: user.email,
		photoURL: user.photoURL || null,
		createdAt: Timestamp.now(),
		darkMode: true,
		karma: 0,
		courses: [],
	}).then(() => console.log('created user'));
}
