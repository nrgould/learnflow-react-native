import {
	doc,
	getDoc,
	getFirestore,
	setDoc,
	Timestamp,
} from 'firebase/firestore/lite';

const db = getFirestore();

export async function getUserProfile(userId: any) {
	const docRef = doc(db, 'users', 'xRLwyUYhbg3jGuZ25aYK');
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		console.log("document doesn't exist!");
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
