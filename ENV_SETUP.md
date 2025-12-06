# Environment Variables Setup

## Development (.env file)

Create a `.env` file in the root of your project with these variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyBkTG8Z9WLUe8GlkCp7yKqvkVhCarvWIBw
VITE_FIREBASE_AUTH_DOMAIN=pablo-traberzo-web.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=pablo-traberzo-web
VITE_FIREBASE_STORAGE_BUCKET=pablo-traberzo-web.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=580433192258
VITE_FIREBASE_APP_ID=1:580433192258:web:af2f2805cf5c52148bd4db
VITE_FIREBASE_MEASUREMENT_ID=G-S84VGP68QL

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_v8rn4nk
VITE_EMAILJS_TEMPLATE_ID=template_a9m2di8
VITE_EMAILJS_PUBLIC_KEY=nnQoyJllpI9sHKdVz

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=pablo_traberzo_web
```

**Note**: Replace `your_cloud_name_here` with your actual Cloudinary cloud name.

## Production (Vercel)

Add these same variables in Vercel Dashboard:

1. Go to your project in Vercel
2. **Settings** → **Environment Variables**
3. Add each variable one by one:
   - Name: `VITE_FIREBASE_API_KEY`
   - Value: `AIzaSyBkTG8Z9WLUe8GlkCp7yKqvkVhCarvWIBw`
   - Environment: Production, Preview, Development (select all)
   - Click **Save**

4. Repeat for all variables above

5. **Redeploy** your project after adding all variables

## Security Notes

✅ **Safe to commit**: `.env.example` (template without real values)  
❌ **Never commit**: `.env` (contains real credentials)  
✅ **Already in .gitignore**: `.env` is ignored  

**Note about Firebase API Key**: 
The Firebase API key is safe to expose in frontend code. It's protected by Firebase Security Rules and authorized domains. However, using environment variables is still best practice for consistency.

## Testing Locally

After creating `.env` file:

1. Restart dev server: `npm run dev`
2. Test login, contact form, and image upload
3. All should work with environment variables

## Troubleshooting

### "Cannot read properties of undefined"
- Make sure `.env` file exists in project root
- Restart dev server after creating `.env`
- Check variable names match exactly (including `VITE_` prefix)

### Variables not working in Vercel
- Verify all variables are added in Vercel Dashboard
- Make sure you selected all environments (Production, Preview, Development)
- Redeploy after adding variables
