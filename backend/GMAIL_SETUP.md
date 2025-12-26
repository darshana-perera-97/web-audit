# Gmail SMTP Setup Guide

If you're getting authentication errors with Gmail, follow these steps:

## Step 1: Enable 2-Step Verification

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", find **2-Step Verification**
4. Click on it and follow the prompts to enable it
5. You'll need to verify your phone number

## Step 2: Generate an App Password

1. After enabling 2-Step Verification, go back to **Security**
2. Scroll down to find **App passwords** (or go directly to: https://myaccount.google.com/apppasswords)
3. You may need to sign in again
4. Under "Select app", choose **Mail**
5. Under "Select device", choose **Other (Custom name)**
6. Type a name like "Web Audit App" and click **Generate**
7. Google will show you a 16-character password (like: `abcd efgh ijkl mnop`)
8. **Copy this password** - you won't be able to see it again!

## Step 3: Update Your .env File

Open your `.env` file and update:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ds.perera.test@gmail.com
SMTP_PASS=your_16_char_app_password_here  # Use the App Password from Step 2
SMTP_FROM_NAME=SitePulse Web Audit
SMTP_FROM_EMAIL=ds.perera.test@gmail.com
```

**Important Notes:**
- Use the **App Password** (16 characters, may have spaces - remove spaces when pasting)
- **DO NOT** use your regular Gmail password
- The App Password should look like: `abcd efgh ijkl mnop` (remove spaces: `abcdefghijklmnop`)

## Step 4: Restart Your Server

After updating the `.env` file:

```bash
# Stop the server (Ctrl+C)
# Then restart it
node server.js
```

## Troubleshooting

### Still getting authentication errors?

1. **Verify 2-Step Verification is enabled**: https://myaccount.google.com/security
2. **Check App Password**: Make sure you copied the full 16-character App Password
3. **Remove spaces**: App Passwords may have spaces - remove them in your .env file
4. **Try generating a new App Password**: Delete the old one and create a new one
5. **Wait a few minutes**: Sometimes Gmail takes a few minutes to activate new App Passwords

### Alternative: Use OAuth2 (Advanced)

For production environments, consider using OAuth2 instead of App Passwords. This requires additional setup but is more secure.

### Test Your Configuration

You can test the email sending by:
1. Starting your server
2. Submitting the form in the Preview page
3. Check the server console for any error messages
4. Check the recipient's inbox (and spam folder)

## Common Error Messages

- **"Invalid login"** or **"EAUTH"**: Wrong password or not using App Password
- **"WebLoginRequired"**: 2-Step Verification not enabled or App Password not generated
- **"Connection timeout"**: Check your internet connection or firewall settings
