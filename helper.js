const imageFilter = function (req, file, cb) {
  // Accept images only
  if (
    !file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|txt|gif|jfif|GIF)$/)
  ) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image and txt files are allowed!"), false);
  }
  cb(null, true);
};
exports.imageFilter = imageFilter;
