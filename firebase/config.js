import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import Constants from 'expo-constants';

const firebaseConfig = {
	apiKey: Constants.manifest.extra.apiKey,
	authDomain: Constants.manifest.extra.authDomain,
	projectId: Constants.manifest.extra.projectId,
	storageBucket: Constants.manifest.extra.storageBucket,
	messagingSenderId: Constants.manifest.extra.messagingSenderId,
	appId: Constants.manifest.extra.appId,
	measurementId: 'G-M73EB4QH6B',
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
