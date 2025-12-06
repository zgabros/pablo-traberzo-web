# EmailJS Setup Instructions

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click "Sign Up" (it's free)
3. Verify your email address

## Step 2: Add Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - Outlook
   - Yahoo
   - Or any other SMTP service
4. Click **Connect Account** and authorize EmailJS
5. **Copy the Service ID** (you'll need this later)

Example Service ID: `service_abc123`

## Step 3: Create Email Template

1. Go to **Email Templates** in the sidebar
2. Click **Create New Template**
3. Fill in the template:

**Template Name:** Contact Form

**Subject:**
```
Nuevo mensaje de contacto - {{subject}}
```

**Content (Body):**
```
Hola Pablo,

Has recibido un nuevo mensaje desde el formulario de contacto de tu sitio web.

De: {{from_name}}
Email: {{from_email}}

Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde pablotraberzo.com
```

4. Click **Save**
5. **Copy the Template ID**

Example Template ID: `template_xyz789`

## Step 4: Get Public Key

1. Go to **Account** in the sidebar
2. Click on **General** tab
3. Find the **Public Key** section
4. **Copy your Public Key**

Example Public Key: `abcdefghijklmnop`

## Step 5: Update Configuration

Open `src/config/emailConfig.js` and replace the placeholder values:

```javascript
const emailConfig = {
  serviceId: "service_abc123",      // Your Service ID from Step 2
  templateId: "template_xyz789",    // Your Template ID from Step 3
  publicKey: "abcdefghijklmnop"     // Your Public Key from Step 4
};
```

## Step 6: Test the Form

1. Make sure your dev server is running: `npm run dev`
2. Navigate to the Contact page: `http://localhost:5173/contacto`
3. Fill out the form with test data
4. Click "Enviar Mensaje"
5. Check your email inbox (the one connected to EmailJS)
6. You should receive the test message!

## Template Variables Reference

These are the variables you can use in your EmailJS template:

- `{{from_name}}` - Name from the form
- `{{from_email}}` - Email from the form
- `{{subject}}` - Subject from the form
- `{{message}}` - Message from the form

## Troubleshooting

### "Service ID not found"
- Double-check your Service ID in `emailConfig.js`
- Make sure the service is active in EmailJS dashboard

### "Template ID not found"
- Verify your Template ID in `emailConfig.js`
- Ensure the template is saved and published

### "Public Key is invalid"
- Copy the Public Key again from EmailJS dashboard
- Make sure there are no extra spaces

### Emails not arriving
- Check your spam folder
- Verify the email service is properly connected
- Test with the "Test" button in EmailJS template editor

### "Failed to send email"
- Check browser console for detailed error
- Verify all EmailJS credentials are correct
- Ensure you have internet connection

## Free Plan Limits

EmailJS free plan includes:
- ✅ 200 emails per month
- ✅ Unlimited email services
- ✅ Unlimited templates
- ✅ Basic support

This is more than enough for a personal website!

## Security Notes

⚠️ **Important**: The EmailJS Public Key is safe to include in your frontend code. It's designed to be public.

However:
- Never share your EmailJS account password
- Don't commit private keys if you upgrade to paid plan
- Consider adding reCAPTCHA to prevent spam (available in EmailJS)

## Next Steps

After successful setup:
- [ ] Test the contact form
- [ ] Verify email reception
- [ ] Customize email template if needed
- [ ] Consider adding reCAPTCHA (optional)
- [ ] Monitor your monthly email quota

## Advanced: Adding reCAPTCHA (Optional)

To prevent spam:
1. Go to EmailJS dashboard > Security
2. Enable reCAPTCHA
3. Follow the instructions to add reCAPTCHA to your form

This is optional but recommended for production sites.
