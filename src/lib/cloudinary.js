import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary correctly
import dotenv from 'dotenv'; // Use lowercase 'dotenv'

dotenv.config(); // Load environment variables

cloudinary.config({
    cloud_name: "ddgftem74", // Make sure your .env variable matches
    api_key: "985842512451926", // Use 'api_key' and 'api_secret'
    api_secret: "vaNiS3RCKxzwKBbIqvM1BabKhcc", // Corrected from 'cloud_api_key'
});

export default cloudinary;
