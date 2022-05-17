const express = require("express");
const {
  uploadFiles,
  getFiles,
  updateFiles,
  deleteFiles,
  deleteIdsFiles,
} = require("../controllers/fileUpload");
const advanceResults = require("../middleware/advanceResults");
const File = require("../model/fileModel");

const router = express.Router();

router
  .route("/")
  .post(uploadFiles)
  .get(advanceResults(File), getFiles)
  .put(updateFiles);

router.route("/delete/:ids").delete(deleteIdsFiles);
router.route("/:modelName/:status").delete(deleteFiles);

module.exports = router;
