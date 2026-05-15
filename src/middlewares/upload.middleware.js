import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {

    // audio files
    if (file.fieldname === "audio") {

      return {
        folder: "music-player/songs",
        resource_type: "video",
      };
    }

    // image files
    return {
      folder: "music-player/thumbnails",
      resource_type: "image",
    };
  },
});

const upload = multer({ storage });

export default upload