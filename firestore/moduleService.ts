import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { app } from '../firebase/config';

const db = getFirestore(app);

export async function getUserCourses(userId: string) {
	console.log('getting user courses');
	const colRef = collection(db, 'users', userId, 'courses');
	const snap = await getDocs(colRef);

	snap.docs.forEach((doc) => console.log(doc.data().course));
}
