# Firestore Setup Instructions

## Step 1: Enable Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **pablo-traberzo-web**
3. Click on **Firestore Database** in the left sidebar
4. Click **Create database**
5. Select **Start in production mode** (we'll add custom rules next)
6. Choose location: **us-central1** (or closest to your users)
7. Click **Enable**

Wait a few seconds for Firestore to be created.

## Step 2: Configure Security Rules

1. In Firestore Database, click on the **Rules** tab
2. Replace the default rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function - check if user is admin
    function isAdmin() {
      return request.auth != null && 
             request.auth.token.email == 'zgabros@gmail.com';
    }
    
    // News collection - public read, admin write
    match /news/{newsId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }
    
    // Hero collection - public read, admin write
    match /hero/{heroId} {
      allow read: if true;
      allow update: if isAdmin();
    }
  }
}
```

3. Click **Publish**

## Step 3: Create Initial Hero Document (Optional)

If you want to pre-populate the hero section:

1. In Firestore Database, click on **Data** tab
2. Click **Start collection**
3. Collection ID: `hero`
4. Document ID: `main`
5. Add fields:
   - `title` (string): "Pablo Traberzo"
   - `subtitle` (string): "Guitarrista & Compositor"
   - `backgroundImage` (string): "" (empty or URL)
   - `updatedAt` (timestamp): Click "Add field" → Select "timestamp" → Use current time

6. Click **Save**

> **Note**: If you skip this step, the app will create the hero document automatically when you first update it from the admin panel.

## Step 4: Verify Setup

1. Go back to your app running locally
2. The app should now be using Firestore instead of localStorage
3. Check the browser console for any errors
4. Try creating a news item in the admin panel
5. Go to Firestore Console and verify the document was created

## Understanding the Security Rules

### News Collection Rules

```javascript
match /news/{newsId} {
  allow read: if true;  // Anyone can read news
  allow create, update, delete: if isAdmin();  // Only admin can write
}
```

- **Public Read**: Anyone visiting your website can see the news
- **Admin Write**: Only zgabros@gmail.com can create, edit, or delete news

### Hero Collection Rules

```javascript
match /hero/{heroId} {
  allow read: if true;  // Anyone can read hero
  allow update: if isAdmin();  // Only admin can update
}
```

- **Public Read**: Anyone can see the hero section
- **Admin Update**: Only zgabros@gmail.com can update the hero

### Admin Function

```javascript
function isAdmin() {
  return request.auth != null &&  // User must be logged in
         request.auth.token.email == 'zgabros@gmail.com';  // Email must match
}
```

This ensures only you can make changes to the content.

## Troubleshooting

### "Missing or insufficient permissions"

**Problem**: You see this error when trying to create/update content.

**Solutions**:
1. Make sure you're logged in with zgabros@gmail.com
2. Check that the security rules are published correctly
3. Try logging out and logging back in

### "Collection not found" or empty data

**Problem**: No data appears in the app.

**Solutions**:
1. Check Firestore Console to see if collections exist
2. Check browser console for errors
3. Make sure Firestore is enabled
4. Verify your Firebase config in `firebaseConfig.js`

### Changes not appearing

**Problem**: You update data but don't see changes.

**Solutions**:
1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Check browser console for errors
3. Verify the data was actually saved in Firestore Console

## Next Steps

After Firestore is set up:
1. ✅ Test creating news in admin panel
2. ✅ Test updating hero in admin panel
3. ✅ Verify data persists after page reload
4. ✅ Test from different devices/browsers
5. ✅ Ready for production deployment!

## Firestore Limits (Free Tier)

Your current usage will be well within the free tier:

- **Reads**: 50,000/day (you'll use ~200/day)
- **Writes**: 20,000/day (you'll use ~10/day)
- **Deletes**: 20,000/day (you'll use ~1/day)
- **Storage**: 1 GB (you'll use <1 MB)

You're safe! 🎉
