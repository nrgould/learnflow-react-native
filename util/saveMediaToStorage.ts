import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

export const saveMediaToStorage = (media: string, path: string) =>
	new Promise((resolve, reject) => {
		const storage = getStorage();
		const storageRef = ref(storage, path);
		console.log('saving to storage');

		fetch(media)
			.then((response) => response.blob())
			.then((blob) => uploadBytes(storageRef, blob))
			.then((snapshot) => getDownloadURL(snapshot.ref))
			.then((downloadUrl) => resolve(downloadUrl))
			.catch(() => reject());
	});
