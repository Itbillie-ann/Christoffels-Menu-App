import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuContext = createContext();

const STORAGE_KEY = '@christoffels_menu_items';

export const COURSES = [
  'Appetizers',
  'Entrées',
  'Desserts',
  'Drinks',
];

export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // LOAD SAVED MENU
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const savedMenu = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedMenu !== null) {
          setMenuItems(JSON.parse(savedMenu));
        }
      } catch (error) {
        console.log('Error loading menu:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadMenu();
  }, []);

  // SAVE MENU WHEN IT CHANGES
  useEffect(() => {
    if (!isLoaded) return;

    const saveMenu = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(menuItems)
        );
      } catch (error) {
        console.log('Error saving menu:', error);
      }
    };

    saveMenu();
  }, [menuItems, isLoaded]);

  // ADD MENU ITEM
  const addMenuItem = (item) => {
    setMenuItems((prev) => [
      ...prev,
      {
        ...item,
        id: Date.now().toString(),
      },
    ]);
  };

  // REMOVE MENU ITEM
  const removeMenuItem = (id) => {
    setMenuItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // UPDATE MENU ITEM
  const updateMenuItem = (id, updatedData) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...updatedData }
          : item
      )
    );
  };

  // UPDATE PRICE
  const updateMenuItemPrice = (id, newPrice) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, price: newPrice }
          : item
      )
    );
  };

  // GET ITEMS BY COURSE
  const getItemsByCourse = (course) => {
    return menuItems.filter(
      (item) => item.course === course
    );
  };

  // AVERAGE PRICE
  const getAveragePrice = () => {
    if (menuItems.length === 0) return 0;

    return (
      menuItems.reduce(
        (sum, item) => sum + Number(item.price || 0),
        0
      ) / menuItems.length
    );
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
        removeMenuItem,
        updateMenuItem,
        updateMenuItemPrice,
        getItemsByCourse,
        getAveragePrice,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}