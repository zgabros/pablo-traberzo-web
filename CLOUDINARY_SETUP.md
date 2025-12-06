# Cloudinary Setup Instructions

## Step 1: Create Cloudinary Account

1. Go to https://cloudinary.com/users/register_free
2. Sign up (free account)
3. Verify your email

## Step 2: Get Cloud Name

1. After login, you'll see the Dashboard
2. Copy your **Cloud Name** (example: `dxxxxxx`)
3. Save it for later

## Step 3: Create Upload Preset

1. Go to **Settings** (gear icon) → **Upload**
2. Scroll down to **Upload presets**
3. Click **Add upload preset**
4. Configure:
   - **Preset name**: `pablo_traberzo_web`
   - **Signing Mode**: **Unsigned** ⚠️ (IMPORTANT!)
   - **Folder**: `pablo-traberzo` (optional)
   - **Allowed formats**: `jpg, png, webp, gif`
   - **Max file size**: `10 MB`
5. Click **Save**

## Step 4: Add Environment Variables to Vercel

1. Go to your project in Vercel Dashboard
2. **Settings** → **Environment Variables**
3. Add these variables:

```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=pablo_traberzo_web
```

4. Click **Save**
5. **Redeploy** your project for changes to take effect

## Step 5: Test Locally (Optional)

Create `.env` file in project root:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=pablo_traberzo_web
```

Restart dev server: `npm run dev`

## Step 6: Test Upload

1. Go to `/admin/news` or `/admin/hero`
2. Click "📷 Subir Imagen"
3. Drag & drop an image or click to browse
4. Crop if needed
5. Click "Upload"
6. URL should auto-fill in the form

## Troubleshooting

### "Upload preset not found"
- Make sure preset name is exactly `pablo_traberzo_web`
- Verify Signing Mode is "Unsigned"
- Check environment variables in Vercel

### "Invalid cloud name"
- Verify Cloud Name in Vercel environment variables
- Make sure there are no extra spaces
- Redeploy after adding variables

### Widget doesn't open
- Check browser console for errors
- Verify Cloudinary script is loaded in index.html
- Try clearing browser cache

### Images not uploading
- Check file size (max 10MB)
- Verify file format (jpg, png, webp, gif)
- Check browser console for errors

## Image Optimization

Cloudinary automatically optimizes images with the URL transformations:

**Original URL:**
```
https://res.cloudinary.com/dxxxxxx/image/upload/v123/image.jpg
```

**Optimized (auto WebP, 1200px width):**
```
https://res.cloudinary.com/dxxxxxx/image/upload/f_auto,q_auto,w_1200/v123/image.jpg
```

The ImageUpload component automatically adds these optimizations!

## Free Tier Limits

- **Storage**: 25 GB
- **Bandwidth**: 25 GB/month
- **Transformations**: 25,000/month
- **Images**: Unlimited

More than enough for a personal website! 🎉
