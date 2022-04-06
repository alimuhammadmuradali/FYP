const multer = require("multer");
const helpers = require("../helper");
const FileModel = require("../model/fileModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const {updateCloudFiles } = require("./fileUploadToCloud");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: helpers.imageFilter,
}).array("files", 3);

exports.uploadFiles = asyncHandler((req, res, next) => {
  console.log(req.body);

  upload(req, res, async (err) => {
    if (req.fileValidationError) {
      return next(new ErrorResponse(req.fileValidationError, 400));
    } else if (err) {
      return next(new ErrorResponse(err, 400)); 
    }

    if (req.files && req.files.length != 3) {
      return next(new ErrorResponse("send 2 images and a text file", 400));
    }

    req.body.txtFile = await updateCloudFiles(
    req.files[0].path,
    req.files[0].originalname
  );
  req.body.labelFile = await updateCloudFiles(
    req.files[2].path,
    req.files[2].originalname
  );
  req.body.imgFile = await updateCloudFiles(
    req.files[1].path,
    req.files[1].originalname
  );

    var File;
    try {
      File = await FileModel.create(req.body);
    } catch (error) {
      return next(new ErrorResponse(error.message, 400));
    }

    return res
      .status(200)
      .send({ message: "File uploaded successfully.", File });
  });
});

exports.updateFiles = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  if (!req.body.objects)
    return next(new ErrorResponse("objects not found", 400));
  if (req.body.objects.length == 0)
    return next(new ErrorResponse("ilength of object is zero", 400));
  if (!req.body.status) return next(new ErrorResponse("status not found", 400));

  req.body.objects.forEach(async (element) => {
    await FileModel.findByIdAndUpdate(element, { status: req.body.status });
  });

  return res.status(200).send({ message: "Status Updated successfully." });
});

exports.deleteFiles = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  var Files = await FileModel.find({modelName:req.params.modelName , status:req.params.status});
  console.log(req.params.modelName);
  console.log(req.params.status);
  console.log(Files.length);
  Files.forEach(async (element) => {
    console.log(element.id);
    // await FileModel.findByIdAndDelete(element.id);
   });

   return res.status(200).send({ message: "successfully deleted." });
});

exports.getFiles = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advanceResults);
});


