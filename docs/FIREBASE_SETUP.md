# Firebase Setup Instructions

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: **pablo-traberzo-web**
4. (Optional) Enable Google Analytics
5. Click "Create project"

## Step 2: Register Web App

1. In your Firebase project, click the **Web icon** (`</>`) to add a web app
2. Register app with nickname: **Pablo Traberzo Web**
3. **Don't** check "Also set up Firebase Hosting" (not needed yet)
4. Click "Register app"

## Step 3: Copy Firebase Configuration

You'll see a `firebaseConfig` object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "pablo-traberzo-web.firebaseapp.com",
  projectId: "pablo-traberzo-web",
  storageBucket: "pablo-traberzo-web.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

**Copy these values** and paste them into:
`src/config/firebaseConfig.js`

Replace the placeholder values with your actual Firebase config.

## Step 4: Enable Google Authentication

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click "Get started" if it's your first time
3. Go to **Sign-in method** tab
4. Click on **Google** provider
5. Click the **Enable** toggle
6. Select a **Project support email** (your email)
7. Click **Save**

## Step 5: Configure Authorized Domains

Firebase automatically authorizes:
- `localhost` (for development)
- Your Firebase hosting domain

If you deploy to a custom domain later:
1. Go to Authentication > Settings > Authorized domains
2. Add your custom domain

## Step 6: Test the Integration

1. Make sure your Firebase config is updated in `src/config/firebaseConfig.js`
2. Run the development server: `npm run dev`
3. Navigate to `http://localhost:5173/admin`
4. You should be redirected to `/login`
5. Click "Continuar con Google"
6. Sign in with your Google account (zgabros@gmail.com)
7. You should be redirected to the admin panel

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure you've copied the correct Firebase config
- Check that all fields in `firebaseConfig.js` are filled

### "Firebase: Error (auth/unauthorized-domain)"
- Go to Firebase Console > Authentication > Settings > Authorized domains
- Add `localhost` if it's not there

### "Access Denied" after login
- Make sure your email (zgabros@gmail.com) is in the ADMIN_EMAILS array
- Check `src/context/AuthContext.jsx` line 10

### Google popup doesn't appear
- Check browser popup blocker settings
- Try a different browser
- Make sure Google provider is enabled in Firebase Console

## Security Notes

⚠️ **Important**: The Firebase config values in `firebaseConfig.js` are **safe to commit to git**. They are public by design and protected by Firebase Security Rules.

However, you should:
- Never commit Firebase Admin SDK private keys
- Set up proper Security Rules in Firebase Console
- Use environment variables for production deployments

## Next Steps

After successful setup:
- [ ] Test login with zgabros@gmail.com
- [ ] Test admin panel access
- [ ] Test logout functionality
- [ ] Add more admin emails if needed (in `AuthContext.jsx`)
- [ ] Consider setting up Firebase Security Rules
- [ ] Consider adding email verification
