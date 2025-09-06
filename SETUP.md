# Guard Mobile App Setup

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

## Features

- **Mock Authentication**: Sign in with any email/password (demo mode)
- **Guard Dashboard**: Shows mock guard name, post, and current location
- **Complaint System**: Submit complaints with location data (stored locally)
- **Location Services**: Uses Expo Location for GPS coordinates
- **Modern UI**: Clean design with NativeWind styling

## Demo Mode

This app runs in demo mode with:

- Mock authentication (accepts any email/password)
- Mock guard data (John Doe, Main Gate Security)
- Local complaint storage (logged to console)
- Real GPS location services

## Development Notes

- All data is stored locally and will be lost on app restart
- For production, integrate with a real backend service
- Location permissions are required for the complaint feature
