const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  // cloudinary: cloudinary,
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png", "mp4", "mp3", "jpeg"],
    folder: "reject-me", // The name of the folder in cloudinary
    resource_type: "auto", // => this is in case you want to upload other type of files, not just images
  },
});

//                     storage: storage
module.exports = multer({ storage });