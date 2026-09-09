import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MenuProvider } from './Screens/Context/MenuContext';

import SplashScreen from './Screens/SplashScreen';
import LoginChoiceScreen from './Screens/LoginChoiceScreen';
import SignInScreen from './Screens/SignInScreen';
import HomeScreen from './Screens/HomeScreen';
import AddMenuItemScreen from './Screens/AddMenuItemScreen';
import MenuScreen from './Screens/MenuScreen';
import CategoryScreen from './Screens/CategoryScreen';

// Account screens
import ProfileScreen from './Screens/Account/ProfileScreen';
import AccountDetailsScreen from './Screens/Account/AccountDetailsScreen';
import PaymentMethodsScreen from './Screens/Account/PaymentMethodsScreen';

// Orders
import OrderFoodScreen from './Screens/Orders/OrderFoodScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Main authentication flow */}
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
          />

          <Stack.Screen
            name="LoginChoice"
            component={LoginChoiceScreen}
          />

          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
          />

          {/* Main app */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />

          <Stack.Screen
            name="Category"
            component={CategoryScreen}
          />

          <Stack.Screen
            name="AddMenuItem"
            component={AddMenuItemScreen}
          />

          <Stack.Screen
            name="Menu"
            component={MenuScreen}
          />

          {/* Account */}
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
          />

          <Stack.Screen
            name="AccountDetails"
            component={AccountDetailsScreen}
          />

          <Stack.Screen
            name="PaymentMethods"
            component={PaymentMethodsScreen}
          />

          {/* Orders */}
          <Stack.Screen
            name="OrderFood"
            component={OrderFoodScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}