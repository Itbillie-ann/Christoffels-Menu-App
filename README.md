# Christoffel's Menu App

A React Native (Expo) mobile application that allows users to browse and manage Christoffel's restaurant menu, update account information, manage profile details and interact with the food ordering screen.

**Project:** Christoffel's Menu App  
**Platform:** React Native (Expo)  
**Language:** JavaScript

## Features

- **Add menu items** with the relevant dish information. 
- **Edit menu items** so existing menu information can be updated.
- **Browse menu categories** and view available dishes.
- **Menu data persistence:** menu changes are saved locally using AsyncStorage and remain available after the app is restarted.
- **Profile management:** view and update profile information, with details saved locally.
- **Account details:** view and edit account information.
- **Payment methods:** add and manage displayed payment-method information. This is a demonstration feature and does not process real payments.
- **Food ordering:** browse ingredient options and submit an ingredient order.
- **Navigation and exit confirmation:** navigate between the app's screens and confirm before leaving the app.

## Running the app

Requires Node.js, npm and Expo Go.

From the project folder:

```bash
cd ChristoffelMenuApp
npm install
npx expo start
```

Scan the QR code using the Expo Go app on your phone, or use an Android emulator.

## Data storage

The app uses `@react-native-async-storage/async-storage` to store selected information locally on the device.

- Menu information is saved locally.
- Profile information is saved locally.
- Local storage allows saved information to remain available after the app is closed and reopened.

This is local device storage, not an online database. Data is not automatically synchronised between devices.

## Project structure

```text
Christoffels-Menu-App/
│
├── ChristoffelMenuApp/
│   ├── assets/                 App icons and image assets
│   ├── Screens/
│   │   ├── Account/            Profile, account details and payment methods
│   │   ├── Components/         Reusable interface components
│   │   ├── Context/             Shared menu data and state management
│   │   └── Orders/              Food ordering screen
│   │
│   ├── screenshots/            Application screenshots
│   ├── App.js                   Navigation and app setup
│   ├── app.json                 Expo configuration
│   ├── index.js                 Application entry point
│   ├── package.json             Project dependencies and scripts
│   └── theme.js                 App theme and styling values
│
└── README.md
```

## Change log

Improvements and updates made to the application.

### Added

- Local data persistence for menu items using AsyncStorage.
- Profile information storage so profile details remain available after restarting the app.
- Account details editing interface.
- Payment methods management interface.
- Improved menu item management.
- Ingredient ordering functionality.
- Confirmation prompts when leaving the application.

### Changed

- Updated the menu context to support saving menu data locally.
- Improved the category screen to make selecting and browsing dishes easier.
- Updated the profile screen to load and save information using AsyncStorage.
- Improved navigation between the app's screens.
- Updated project dependencies to support the new functionality.

### Bug fixes and improvements

- Fixed menu data resetting after restarting the application.
- Improved profile data persistence.
- Fixed the category selection scrolling experience.
- Improved the exit confirmation behaviour.
- Improved the overall usability of the application.

## Technologies

- **React Native** – Mobile application framework.
- **Expo** – Development and testing environment.
- **JavaScript** – Application programming language.
- **React Navigation** – Screen navigation.
- **AsyncStorage** – Local device data persistence.
- **Ionicons** – Application icons.

## Important note

This application is a demonstration project. Payment methods are for display and demonstration purposes only. Do not enter real payment-card information.
