import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from '../config/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'property_images',
      public_id: `${Date.now()}-${file.originalname}`,
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      resource_type: 'auto',
    };
  },
});

export const cloudUpload = multer({ storage });
