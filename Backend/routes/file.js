const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const authMiddleware = require("../middleware/authMiddleware");

const {
  uploadFile,
  getFileByCode,
  downloadFile,
} = require("../controllers/file");

router.post("/upload", authMiddleware, upload.single("file"), uploadFile);

router.get("/file/:code", getFileByCode);

router.get("/download/:id", downloadFile);

module.exports = router;
