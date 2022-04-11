const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
  txtFile: {
    type: String,
    required: [true, "txtFile is  Required"],
  },
  imgFile: {
    type: String,
    required: [true, "imgFile is  Required"],
  },
  labelFile: {
    type: String,
    required: [true, "labelFile is  Required"],
  },

  modelName: {
    type: String,
    required: [true, "modelName is  Required"],
  },

  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Approved", "Rejected"],
  },

  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("File", FileSchema);
