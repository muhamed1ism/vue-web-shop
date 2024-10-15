import axios from 'axios';
import dotenv from "dotenv";

dotenv.config();

const imgbbApiKey = process.env.IMGBB_KEY;

export const uploadImageToImgbb = async (imageBuffer) => {
  const formData = new FormData();
  formData.append('image', imageBuffer.toString('base64'));

  const response = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData);
  return response.data.data.url;
};