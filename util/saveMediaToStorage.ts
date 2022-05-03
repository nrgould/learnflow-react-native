import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';
import { setProgress } from '../store/postSlice';

export const saveMediaToStorage = async (media: any, path: string) => {
	const storage = getStorage();
	const storageRef = ref(storage, path);
	console.log('saving to storage');

	const uploadTask = uploadBytesResumable(storageRef, media);

	uploadTask.on(
		'state_changed',
		(snapshot) => {
			const prog = Math.round(
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			);
			console.log('progress:', prog);
			// dispatch(setProgress(prog));
		},
		(error) => {
			console.log(error);
		},
		() => {
			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				console.log('File available at:', downloadURL);
				return downloadURL;
			});
		}
	);
};
// new Promise((resolve, reject) => {
// 	const storage = getStorage();
// 	const storageRef = ref(storage, path);
// 	console.log('saving to storage');

// 	fetch(media)
// 		.then((response) => {
// 			console.log('response:', response);
// 			return response.blob();
// 		})
// 		.then((blob) => {
// 			console.log('blob:', blob);
// 			return uploadBytes(storageRef, blob);
// 		})
// 		.then((snapshot) => {
// 			console.log('uploaded');
// 			return getDownloadURL(snapshot.ref);
// 		})
// 		.then((downloadUrl) => resolve(downloadUrl))
// 		.catch(() => reject());
// });
