const express = require("express");
const { uploadFiles, getFiles , apiRunning } = require("../controllers/fileUpload");
const advanceResults = require("../middleware/advanceResults");
const File = require("../model/fileModel");

const router = express.Router();

router.route("/").post(uploadFiles).get(advanceResults(File), getFiles);

module.exports = router;
