# LifeFlow Mobile - Donor App

React Native (Expo) mobile application for blood donors.

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your mobile device (Download from Play Store or App Store)

## Installation

1. Navigate to the mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

## Configuration

### IMPORTANT: Update API Base URL

Before running the app, you MUST update the base URL in `services/api.js`:

1. Open `services/api.js`
2. Find your machine's local IP address:
   - **Windows:** Open CMD and run `ipconfig`, look for IPv4 Address
   - **Mac:** Open Terminal and run `ifconfig` or `hostname -I`
   - **Linux:** Open Terminal and run `ip addr` or `hostname -I`
3. Replace `http://192.168.1.X:3001` with your actual IP
   - Example: `http://192.168.1.105:3001`

**Note:** Do NOT use `localhost` or `127.0.0.1` as the Android emulator cannot access it.

## Running the App

### Start the Backend Server First

Make sure the backend server is running on port 3001:
```bash
# In the project root directory
npm run dev:server
```

### Start the Mobile App

```bash
npm start
```

This will start the Expo development server and show a QR code.

### Run on Physical Device (Recommended)

1. Install Expo Go from Play Store (Android) or App Store (iOS)
2. Scan the QR code with:
   - **Android:** Expo Go app
   - **iOS:** Camera app (will open Expo Go)

### Run on Android Emulator

```bash
npm run android
```

Requirements:
- Android Studio installed
- Android emulator configured and running

### Run on iOS Simulator (Mac only)

```bash
npm run ios
```

Requirements:
- Xcode installed
- iOS simulator configured

## Features

### Authentication
- Login with email and password
- Register as a blood donor
- Secure JWT token storage

### Home Screen
- Donation eligibility checker
- Blood group display
- Donation statistics
- Nearby blood banks list
- Quick action buttons

### History Screen
- View all past donations
- Donation statistics
- Status tracking (Completed/Pending/Cancelled)

### Profile Screen
- User information display
- Account settings
- Logout functionality

## Project Structure

```
mobile/
├── App.js                  # Main app entry point
├── app.json                # Expo configuration
├── babel.config.js         # Babel configuration
├── package.json            # Dependencies
│
├── navigation/
│   └── AppNavigator.js     # Navigation setup (Stack + Tab)
│
├── screens/
│   ├── LoginScreen.js      # Login page
│   ├── RegisterScreen.js   # Registration page
│   ├── HomeScreen.js       # Dashboard
│   ├── HistoryScreen.js    # Donation history
│   └── ProfileScreen.js    # User profile
│
└── services/
    ├── api.js              # API service layer
    └── auth.js             # Authentication service
```

## API Endpoints Used

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `GET /api/donations/history` - Get donation history

## Tech Stack

- **Framework:** React Native (Expo)
- **Navigation:** React Navigation (Stack + Bottom Tabs)
- **HTTP Client:** Axios
- **Storage:** AsyncStorage
- **Styling:** React Native StyleSheet

## Troubleshooting

### Cannot connect to backend

1. Verify backend server is running on port 3001
2. Check that the IP address in `services/api.js` matches your machine's IP
3. Ensure your phone and computer are on the same WiFi network
4. Check firewall settings allow connections to port 3001

### App crashes on startup

1. Clear Expo cache: `expo start -c`
2. Delete node_modules and reinstall: `rm -rf node_modules && npm install`
3. Check for any console errors in the terminal

### Login fails with 401 error

1. Verify credentials are correct
2. Check that the user exists in the database
3. Ensure the user role is 'DONOR'

## Building for Production

### Android APK

```bash
expo build:android
```

### iOS IPA

```bash
expo build:ios
```

Note: You need an Expo account and may need to configure build credentials.

## Development Notes

- Only donors can access the mobile app
- JWT tokens are stored securely in AsyncStorage
- The app automatically redirects to login if the token expires
- All API requests include the Authorization header automatically

## Support

For issues or questions, please refer to the main project documentation.
