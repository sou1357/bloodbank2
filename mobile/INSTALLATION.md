# Detailed Installation Guide

## Prerequisites Check

Before starting, ensure you have:

- [ ] Node.js 18 or higher (`node --version`)
- [ ] npm 9 or higher (`npm --version`)
- [ ] A smartphone (Android or iOS)
- [ ] Same WiFi network for phone and computer

## Step-by-Step Installation

### 1. Install Expo CLI (Optional but Recommended)

```bash
npm install -g expo-cli
```

### 2. Navigate to Mobile Directory

```bash
cd mobile
```

### 3. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React Native
- Expo SDK
- React Navigation
- Axios
- AsyncStorage

**Expected time:** 2-5 minutes depending on internet speed

### 4. Install Expo Go on Your Phone

**Android:**
1. Open Google Play Store
2. Search for "Expo Go"
3. Install the app

**iOS:**
1. Open App Store
2. Search for "Expo Go"
3. Install the app

### 5. Configure API Connection

This is the most critical step!

#### Find Your Computer's IP Address

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" under your WiFi adapter
Example: `192.168.1.105`

**Mac:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```
Or simply:
```bash
hostname -I
```

**Linux:**
```bash
ip addr show | grep "inet " | grep -v 127.0.0.1
```

#### Update the API Configuration

1. Open `services/api.js` in your code editor
2. Find line 11:
   ```javascript
   const BASE_URL = 'http://192.168.1.X:3001';
   ```
3. Replace `192.168.1.X` with your actual IP address
4. Save the file

**Example:**
```javascript
const BASE_URL = 'http://192.168.1.105:3001';
```

### 6. Verify Backend Server is Running

In a separate terminal from the project root:

```bash
npm run dev:server
```

You should see:
```
🩸 LifeFlow server running on port 3001
```

**Keep this terminal running!**

### 7. Start the Mobile App

In the mobile directory:

```bash
npm start
```

or

```bash
expo start
```

You should see:
- Metro bundler starting
- A QR code displayed in the terminal
- A browser window opening with Expo DevTools

### 8. Connect Your Phone

#### Android:
1. Open Expo Go app
2. Tap "Scan QR code"
3. Scan the QR code from your terminal
4. Wait for the app to load (first time may take 1-2 minutes)

#### iOS:
1. Open the Camera app
2. Point at the QR code
3. Tap the notification to open in Expo Go
4. Wait for the app to load

### 9. Test the Connection

Once the app loads, you should see the LifeFlow login screen.

Try to register:
1. Tap "Register"
2. Fill in the form
3. Tap "Create Account"

If registration succeeds, you're all set!

## Common Issues and Solutions

### Issue: "Network request failed"

**Solution:**
1. Verify your phone and computer are on the same WiFi
2. Check the IP address in `services/api.js` matches your computer's IP
3. Ensure no VPN is active
4. Check firewall isn't blocking port 3001

### Issue: "Unable to connect to development server"

**Solution:**
1. Restart the Expo development server (`expo start -c`)
2. Ensure port 19000 and 19001 aren't blocked
3. Try connecting via tunnel: `expo start --tunnel`

### Issue: App crashes on startup

**Solution:**
1. Clear cache: `expo start -c`
2. Reinstall dependencies:
   ```bash
   rm -rf node_modules
   npm install
   ```
3. Update Expo Go app on your phone

### Issue: Cannot scan QR code

**Solution:**
1. Try manual connection in Expo Go:
   - Android: Enter the URL manually (shown in terminal)
   - iOS: Type the URL in Safari and open in Expo Go
2. Use tunnel mode: `expo start --tunnel`

### Issue: "User already exists" error

**Solution:**
1. The email is already registered
2. Try logging in instead
3. Or use a different email address

### Issue: Backend server not starting

**Solution:**
1. Check if port 3001 is already in use
2. Verify SQLite database exists in `server/prisma/dev.db`
3. Try restarting the server

## Network Configuration

### Firewall Settings

Make sure these ports are open:
- **3001** - Backend API server
- **19000** - Expo DevTools
- **19001** - Expo development server

**Windows Firewall:**
1. Open Windows Defender Firewall
2. Click "Advanced settings"
3. Add inbound rules for ports 3001, 19000, 19001

**Mac Firewall:**
1. System Preferences → Security & Privacy → Firewall
2. Click "Firewall Options"
3. Add Node and Expo to allowed applications

## Development Tips

### Hot Reload
Changes to your code will automatically reload in the app. Just save your files!

### Debugging
- Shake your phone to open the developer menu
- Enable "Debug Remote JS" to use Chrome DevTools
- View console logs in the terminal

### Clearing Cache
If you see unexpected behavior:
```bash
expo start -c
```

## Next Steps

After successful installation:
1. Register a donor account
2. Explore the home screen
3. Check the profile section
4. View donation history (will be empty initially)

## Getting Help

If you encounter issues not covered here:
1. Check the main README.md
2. Review the Expo documentation: https://docs.expo.dev
3. Check React Navigation docs: https://reactnavigation.org

## Production Build

To build for production:

**Android APK:**
```bash
expo build:android
```

**iOS:**
```bash
expo build:ios
```

Note: Building requires an Expo account (free).
