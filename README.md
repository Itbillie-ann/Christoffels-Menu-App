# Chef's Menu Manager

A React Native (Expo) mobile app that lets Christoffel, a private chef, manage the dishes on his menu. This is the final Portfolio of Evidence (PoE) submission for MAST5112 and builds on the Part 2 version of the same project.

**Student:** Alicia B. Bukitu (ST10538583)
**Lecturer:** Wellcome Zaranyika
**Submission date:** 06 November 2026

## Features

- **Add menu items** with a dish name, description, course (Starter, Main Course or Dessert) and price.
- **Edit and delete menu items.** Edit opens the same form, pre-filled. Delete asks for confirmation first. Every change shows on the Menu and Home screens straight away.
- **Search by dish name** and **filter by course**. Search and filter can be combined, and one tap clears both.
- **Menu statistics** on the Home screen: total number of items, the average price of all items, and the number of items (with their average price) in each course.
- **Validation and feedback**: inline error messages, success messages after adding, updating and deleting, and helpful empty states.

## Running the app

Requires Node.js. From the project folder:

```
npm install
npx expo start
```

Scan the QR code with the Expo Go app on your phone, or press `a` to open an Android emulator.

Menu items are held in memory while the app is open, so they reset when the app is fully closed.

## Project structure

```
App.js                  Navigation setup and app providers
constants/theme.js      Colours, spacing, corner radii and the course list
context/MenuContext.js  Shared menu data: add, update and delete functions
utils/                  Validation, search/filter, statistics, price formatting, alerts
components/             Reusable interface pieces (buttons, form fields, cards, search bar...)
screens/                Splash, Home, Menu and Menu Form screens
```

## Change log

All changes since the Part 2 submission.

### Added

- Edit and update an existing menu item (Menu Form screen, opened from the Edit button on a menu card).
- Delete a menu item, with a confirmation prompt and a success message.
- Search for a menu item by name (not case-sensitive, partial matches allowed) with a clear (x) button.
- Filter by course using All, Starter, Main Course and Dessert buttons.
- "Clear search and filter" link, plus a "Showing X of Y items" count.
- Menu statistics on the Home screen: total items, average price, and the count and average price per course.
- Back button on the Menu and Menu Form screens so navigation between features is clear.
- Duplicate check: the same dish name cannot be added twice within one course.
- Empty states for an empty menu and for a search or filter with no results.

### Changed

- `AddMenuItemScreen` was replaced by `MenuFormScreen`, which handles both adding and editing.
- The Home screen now shows the full statistics panel instead of a single item count, and is titled "Chef's Menu Manager".
- The Menu screen now has Edit and Delete buttons on every item and an Add Menu Item button.
- Validation is stricter: names and descriptions need a minimum length, and the price must be a positive number with at most two decimals. Error messages clear as soon as the chef starts correcting the field.
- Success messages now appear after adding, updating and deleting (Part 2 only confirmed adding).
- The price field uses the decimal keypad instead of the numeric keypad.
- Item IDs are now a timestamp plus a random suffix to avoid two items sharing an ID.
- Fixed top padding was replaced by safe-area handling so content is not hidden behind the phone's status bar.

### Refactoring

- Colours, spacing and the course list moved out of individual screens into `constants/theme.js`, so the look is changed in one place.
- Repeated interface code was extracted into reusable components: `AppButton`, `FormField`, `ScreenHeader`, `Screen`, `SearchBar`, `CourseFilter`, `MenuItemCard`, `StatCard`, `StatsPanel` and `EmptyState`.
- Logic was moved out of the screens into small reusable functions: `validateMenuItem`, `filterMenuItems`, `calculateStats`, `formatPrice`, `showMessage` and `confirmAction`.
- `MenuContext` now provides `updateMenuItem` and `deleteMenuItem`, and `useMenu` reports a clear error if it is used outside the provider.
- Variable, function and component names were reviewed so each describes what it does.

### Bug fixes

- The Part 2 price check used `isNaN(parseFloat(...))`, which accepted entries such as `12abc`. Prices are now checked against a strict pattern.
- `Alert.alert` does nothing when the app runs in a browser. `showMessage` and `confirmAction` use the browser dialogs on the web so confirmations still work.

## Technologies

React Native, Expo, React Navigation (native stack), `@react-native-picker/picker`.
