const firebaseAdmin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const serviceAccount = require('../ambassadors.json');

const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket(`gs://final-year-project-345318.appspot.com`);


async function uploadFile(path, filename) {

    // Upload the File
    const storage = await storageRef.upload(path, {
        public: true,
        destination: `data/${filename}`,
        metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
        }
    });

    return storage[0].metadata.mediaLink;
}


(async() => {
    const url = await uploadFile('../uploads/a-2.png', "a-2.png");
    console.log(url);
})();

