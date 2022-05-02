const functions = require('firebase-functions');

const admin = require('firebase-admin');

const db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.helloWorld = functions.https.onRequest((request, response) => {
	functions.logger.info('Hello logs!', { structuredData: true });
	response.send('Hello from Firebase!');
});

exports.userFollowsCourse = functions.firestore
	.document('courses/{id}/followers/{uid}')
	.onCreate((snapshot, context) => {
		const userId = context.params.uid;
		const courseId = context.params.id;

		const modulesSnap = db
			.collection('courses')
			.doc(courseId)
			.collection('modules')
			.get();

		const modules = modulesSnap.data();
		functions.logger.info(modules);
		return modules.map((module) => {
			db.collection('users')
				.doc(userId)
				.collection('modules')
				.add(module);
		});

		//get modules for course

		// return db.collection('users').doc(userId).collection('modules').add();
	});
