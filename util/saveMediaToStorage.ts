import { getStorage, ref, uploadBytes } from 'firebase/storage';

export const saveMediaToStorage = (media: string, path: string) =>
	new Promise((resolve, reject) => {
		const storage = getStorage();
		const storageRef = ref(storage, path);

		fetch(media)
			.then((response) => response.blob())
			.then((blob) => uploadBytes(storageRef, blob))
			.then((snapshot) => snapshot.metadata.contentEncoding)
			.then((downloadUrl) => resolve(downloadUrl))
			.catch(() => reject());
	});
