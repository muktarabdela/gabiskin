import { v2 as Cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();
Cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export const uploadToCloudinary = async (file, folder) => {
    const res = await Cloudinary.uploader.upload(file, { folder });
    return res.secure_url;
}

export default Cloudinary;