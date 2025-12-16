# Mobile App Quick Start

## Step 1: Install Dependencies

```bash
cd mobile
npm install
```

## Step 2: Update API Configuration

**CRITICAL STEP - DO NOT SKIP**

1. Open `services/api.js`
2. Find your computer's IP address:
   - Windows: Run `ipconfig` in CMD
   - Mac/Linux: Run `ifconfig` or `hostname -I` in Terminal
3. Update line 11:
   ```javascript
   const BASE_URL = 'http://YOUR_IP_HERE:3001';
   ```
   Example: `const BASE_URL = 'http://192.168.1.105:3001';`

## Step 3: Start Backend Server

In a separate terminal, from the project root:
```bash
npm run dev:server
```

Should show: `🩸 LifeFlow server running on port 3001`

## Step 4: Start Mobile App

```bash
npm start
```

## Step 5: Run on Your Phone

1. Install **Expo Go** from Play Store (Android) or App Store (iOS)
2. Scan the QR code shown in terminal with:
   - Android: Expo Go app
   - iOS: Camera app (opens Expo Go)

## Step 6: Test the App

### Register a New Donor:
1. Tap "Register" on the login screen
2. Fill in details:
   - Name: Test Donor
   - Email: donor@test.com
   - Password: password123
   - Blood Group: A+
3. Tap "Create Account"

### Explore Features:
- **Home Tab:** View eligibility status and stats
- **History Tab:** See donation history (empty for new users)
- **Profile Tab:** View profile and logout

## Troubleshooting

**Can't connect to server:**
- Ensure phone and computer are on same WiFi
- Verify IP address is correct in `services/api.js`
- Check firewall allows port 3001

**App won't start:**
- Run `expo start -c` to clear cache
- Delete node_modules: `rm -rf node_modules && npm install`

**Login fails:**
- Ensure backend server is running
- Check that you registered with role 'DONOR'
- Verify email/password are correct

## Next Steps

- Add donation history by creating blood requests
- Explore nearby blood banks (feature placeholder)
- Update profile information
