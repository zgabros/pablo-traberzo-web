// Cloudinary configuration
export const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'YOUR_CLOUD_NAME',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'YOUR_UPLOAD_PRESET',
};

// Instructions:
// 1. Create account at https://cloudinary.com/users/register_free
// 2. Get your Cloud Name from Dashboard
// 3. Create Upload Preset:
//    - Settings → Upload → Upload presets
//    - Add upload preset
//    - Name: pablo_traberzo_web
//    - Signing Mode: Unsigned
//    - Save
// 4. Add to Vercel environment variables:
//    VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
//    VITE_CLOUDINARY_UPLOAD_PRESET=pablo_traberzo_web
