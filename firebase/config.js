// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD_X5PcWJXgFVM26wPJGBD4eMpYMLRnrhI',
	authDomain: 'learnflow-devleopment.firebaseapp.com',
	projectId: 'learnflow-devleopment',
	storageBucket: 'learnflow-devleopment.appspot.com',
	messagingSenderId: '157745759938',
	appId: '1:157745759938:web:cd00a7e1bbf89ab9c65d5b',
	measurementId: 'G-P1Q8S3GLRM',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
