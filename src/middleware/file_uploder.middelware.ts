import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.conflict.";

export const uploader = () => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async () => {
      return {
        folder: "shop-kart",
        allowed_format: ["jpg", "jpeg", "webp", "png", "avif", "pdf"],
      };
    },
  });

  const upload = multer({ storage });

  return upload;
};
