const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("../ambassadors.json");
const firebase = require("firebase/storage"); // eslint-disable-line global-require

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin
  .storage()
  .bucket(`gs://final-year-project-345318.appspot.com`);

exports.updateCloudFiles = async (path, filename) => {
  let uuid = uuidv4();
  let baseUrl;
  var storage = await storageRef
    .upload(path, {
      public: true,
      destination: `data/${filename}`,
      metadata: {
        firebaseStorageDownloadTokens: uuid,
      },
    })
    .then((data) => {
      let file = data[0];
      baseUrl =
        "https://firebasestorage.googleapis.com/v0/b/" +
        file.metadata.bucket +
        "/o/" +
        encodeURIComponent(file.name) +
        "?alt=media&token=" +
        uuid;
    });

  return baseUrl;
};

getPathStorageFromUrl = (url) => {
  const baseUrl =
    "https://firebasestorage.googleapis.com/v0/b/final-year-project-345318.appspot.com/o/";

  imagePath = url.replace(baseUrl, "");

  const indexOfEndPath = imagePath.indexOf("?");

  imagePath = imagePath.substring(0, indexOfEndPath);

  imagePath = imagePath.replace("%2F", "/");

  return imagePath;
};

exports.deleteCloudFiles = async (filepath) => {
  console.log(filepath);
  filename = getPathStorageFromUrl(filepath);
  console.log(filename);
  await storageRef.file(filename).delete();
};
