const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  mimetype: String,
  size: Number,
  path: String,
  hashedCode: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDownloaded: {
    type: Boolean,
    default: false,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

module.exports = mongoose.model("File", fileSchema);
