import axios from "axios";

// for get image url by use imagebb api
export const uploadToImgbb = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_KEY}`,
      formData
      );
    return response.data.data.url; // Returns the uploaded image URL
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};
