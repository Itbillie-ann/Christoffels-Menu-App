
import React, {
  createContext,
  useState,
  useContext,
} from 'react';

const MenuContext = createContext();

export const COURSES = [
  'Appetizers',
  'Entrées',
  'Desserts',
  'Drinks',
];

export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState([]);

  // -----------------------------------
  // ADD MENU ITEM
  // -----------------------------------

  const addMenuItem = (item) => {
    setMenuItems((prev) => [
      ...prev,
      {
        ...item,
        id: Date.now().toString(),
      },
    ]);
  };

  // -----------------------------------
  // REMOVE MENU ITEM
  // -----------------------------------

  const removeMenuItem = (id) => {
    setMenuItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // -----------------------------------
  // UPDATE ENTIRE MENU ITEM
  // -----------------------------------

  const updateMenuItem = (id, updatedData) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updatedData,
            }
          : item
      )
    );
  };

  // -----------------------------------
  // UPDATE PRICE ONLY
  // -----------------------------------

  const updateMenuItemPrice = (id, newPrice) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              price: newPrice,
            }
          : item
      )
    );
  };

  // -----------------------------------
  // GET ITEMS BY COURSE
  // -----------------------------------

  const getItemsByCourse = (course) => {
    return menuItems.filter(
      (item) => item.course === course
    );
  };

  // -----------------------------------
  // AVERAGE PRICE
  // -----------------------------------

  const getAveragePrice = () => {
    if (menuItems.length === 0) {
      return 0;
    }

    return (
      menuItems.reduce(
        (sum, item) =>
          sum + Number(item.price || 0),
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
