const File = require("../models/file");
const User = require("../models/user");

const path = require("path");
const bcrypt = require("bcryptjs");
const fs = require("fs");

const guestUploads = {};

exports.uploadFile = async (req, res) => {
  try {
    let user = null;

    if (!req.user) {
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

      if (!guestUploads[ip]) {
        guestUploads[ip] = 0;
      }

      if (guestUploads[ip] >= 2) {
        return res.status(403).json({
          message: "Guest upload limit reached. Please create account.",
        });
      }

      guestUploads[ip]++;
    }

    if (req.user) {
      user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (!user.isPremium && user.uploadsUsed >= 4) {
        return res.status(403).json({
          message: "Free upload limit reached. Upgrade to premium.",
        });
      }
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        message: "Transfer code required",
      });
    }

    const hashedCode = await bcrypt.hash(code, 5);

    const file = new File({
      filename: req.file.filename,

      originalname: req.file.originalname,

      mimetype: req.file.mimetype,

      size: req.file.size,

      path: req.file.path,

      hashedCode: hashedCode,

      uploadedBy: user ? user._id : null,
    });


    await file.save();

    if (user) {
      user.uploadsUsed += 1;

      await user.save();
    }

    res.status(200).json({
      message: "File uploaded successfully",

      guestUpload: !user,

      uploadsUsed: user ? user.uploadsUsed : null,

      uploadsRemaining: user
        ? user.isPremium
          ? "Unlimited"
          : 4 - user.uploadsUsed
        : 2,

      premium: user ? user.isPremium : false,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getFileByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const files = await File.find();

    let matchedFile = null;

    for (let file of files) {
      const isMatch = await bcrypt.compare(code, file.hashedCode);

      if (isMatch) {
        matchedFile = file;

        break;
      }
    }

    if (!matchedFile) {
      return res.status(404).json({
        message: "Invalid code",
      });
    }

    res.json({
      fileId: matchedFile._id,

      filename: matchedFile.originalname,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    if (file.isDownloaded) {
      return res.status(410).json({
        message: "File already downloaded",
      });
    }

    const filePath = path.join(__dirname, "..", file.path);

    res.download(
      filePath,
      file.originalname,

      async (err) => {
        if (err) {
          console.error("Download error:", err);

          return;
        }

        try {
          file.isDownloaded = true;

          await file.save();

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }

          await File.findByIdAndDelete(id);

          console.log("File deleted after download");
        } catch (deleteErr) {
          console.error("Delete error:", deleteErr);
        }
      },
    );
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
