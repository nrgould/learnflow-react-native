import {
	doc,
	getDoc,
	getFirestore,
	setDoc,
	Timestamp,
} from 'firebase/firestore/lite';
import { app } from '../firebase/config';

const db = getFirestore(app);

export async function getUserProfile(userId: string) {
	const docRef = doc(db, 'users', userId);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		// console.log('data: ', docSnap.data());
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
		karma: 0,
		courses: [],
	}).then(() => console.log('created user'));
}
