const multer = require("multer");
const helpers = require("../helper");
const FileModel = require("../model/fileModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

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
  // console.log("ali");
  // return next(new ErrorResponse(`Your status is Inactive`, 404));

  upload(req, res, async (err) => {
    if (req.fileValidationError) {
      return next(new ErrorResponse(req.fileValidationError, 400));
      //return res.status(400).send({ message: req.fileValidationError });
    } else if (err) {
      return next(new ErrorResponse(err, 400));
      //  return res.status(400).send(err);
    }
    console.log(req.files.length);
    console.log(req.files[0].originalname);

    if (req.files.length != 3) {
      return next(new ErrorResponse("send 2 images and a text file", 400));
    }
    req.body.txtFile = req.files[0].originalname;
    req.body.labelFile = req.files[2].originalname;
    req.body.imgFile = req.files[1].originalname;
    var File;
    try {
      File = await FileModel.create(req.body);
    } catch (error) {
      return next(new ErrorResponse(error.message, 400));
    }

    console.log(req.body);
    return res
      .status(200)
      .send({ message: "File uploaded successfully.", File });
  });
});

exports.getFiles = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advanceResults);
});
