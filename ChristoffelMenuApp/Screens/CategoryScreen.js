import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Pressable,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Toolbar from './Components/Toolbar';
import { useMenu } from './Context/MenuContext';

const colors = {
  beige: '#B49A78',
  cream: '#F7EFE1',
  darkBrown: '#3D2A1F',
  brown: '#654735',
  gold: '#B8863B',
  white: '#FFFFFF',
  lightBrown: '#E8D9C3',
  red: '#9B3D3D',
};

export default function CategoryScreen({ navigation, route }) {
  const { menuItems, removeMenuItem, updateMenuItemPrice } = useMenu();

  const course = route.params?.course || 'Appetizers';

  const items = menuItems.filter(
    (item) => item.course === course
  );

  const [pickerVisible, setPickerVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  const [action, setAction] = useState(null);

  // -----------------------------------
  // BACK TO HOME
  // -----------------------------------

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  // -----------------------------------
  // OPEN ITEM PICKER
  // -----------------------------------

  const openItemPicker = (selectedAction) => {
    if (items.length === 0) {
      Alert.alert(
        'No Items',
        `There are no ${course.toLowerCase()} on the menu yet.`
      );
      return;
    }

    setAction(selectedAction);
    setPickerVisible(true);
  };

  // -----------------------------------
  // SELECT ITEM
  // -----------------------------------

  const handleItemSelected = (item) => {
    setPickerVisible(false);

    if (action === 'edit') {
      navigation.navigate('AddMenuItem', {
        item,
        course,
      });

      return;
    }

    if (action === 'price') {
      setSelectedItem(item);
      setNewPrice(String(item.price));
      setPriceModalVisible(true);

      return;
    }

    if (action === 'remove') {
      Alert.alert(
        'Remove Item',
        `Are you sure you want to remove "${item.dishName}" from the menu?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => removeMenuItem(item.id),
          },
        ]
      );
    }
  };

  // -----------------------------------
  // SAVE NEW PRICE
  // -----------------------------------

  const handleSavePrice = () => {
    const parsedPrice = Number(newPrice);

    if (!newPrice.trim()) {
      Alert.alert(
        'Price Required',
        'Please enter a price.'
      );
      return;
    }

    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert(
        'Invalid Price',
        'Please enter a valid price greater than R0.'
      );
      return;
    }

    updateMenuItemPrice(
      selectedItem.id,
      parsedPrice
    );

    setPriceModalVisible(false);
    setSelectedItem(null);
    setNewPrice('');

    Alert.alert(
      'Price Updated',
      `${selectedItem.dishName} is now R${parsedPrice.toFixed(2)}.`
    );
  };

  return (
    <View style={styles.container}>

      {/* -----------------------------------
          TOP TOOLBAR
      ----------------------------------- */}

      <Toolbar
        navigation={navigation}
        title={course}
        dark={false}
        onBackPress={handleBack}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* -----------------------------------
            PAGE TITLE
        ----------------------------------- */}

        <Text style={styles.heading}>
          {course}
        </Text>

        <Text style={styles.subheading}>
          Manage the dishes in this section of your menu.
        </Text>

        {/* -----------------------------------
            MENU ITEMS
        ----------------------------------- */}

        {items.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="restaurant-outline"
                size={34}
                color={colors.gold}
              />
            </View>

            <Text style={styles.emptyTitle}>
              No dishes yet
            </Text>

            <Text style={styles.emptyText}>
              Add your first dish to this category.
            </Text>
          </View>
        ) : (
          items.map((item) => (
            <View
              key={item.id}
              style={styles.itemCard}
            >
              <View style={styles.itemInformation}>

                <Text style={styles.itemName}>
                  {item.dishName}
                </Text>

                {item.description ? (
                  <Text style={styles.itemDescription}>
                    {item.description}
                  </Text>
                ) : null}

                <Text style={styles.itemPrice}>
                  R{Number(item.price).toFixed(2)}
                </Text>

              </View>
            </View>
          ))
        )}

        {/* -----------------------------------
            ADD ITEM
        ----------------------------------- */}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate('AddMenuItem', {
              course,
            })
          }
        >
          <Ionicons
            name="add-circle-outline"
            size={21}
            color={colors.white}
          />

          <Text style={styles.addButtonText}>
            ADD ITEM
          </Text>
        </TouchableOpacity>

        {/* -----------------------------------
            EDIT / PRICE BUTTONS
        ----------------------------------- */}

        <View style={styles.actionRow}>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => openItemPicker('edit')}
          >
            <Ionicons
              name="create-outline"
              size={20}
              color={colors.darkBrown}
            />

            <Text style={styles.secondaryButtonText}>
              EDIT ITEM
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => openItemPicker('price')}
          >
            <Ionicons
              name="pricetag-outline"
              size={20}
              color={colors.darkBrown}
            />

            <Text style={styles.secondaryButtonText}>
              CHANGE PRICE
            </Text>
          </TouchableOpacity>

        </View>

        {/* -----------------------------------
            REMOVE ITEM
        ----------------------------------- */}

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => openItemPicker('remove')}
        >
          <Ionicons
            name="trash-outline"
            size={20}
            color={colors.red}
          />

          <Text style={styles.removeButtonText}>
            REMOVE ITEM
          </Text>
        </TouchableOpacity>

      </ScrollView>

      {/* ===================================
          ITEM SELECTION MODAL
      =================================== */}

      <Modal
        visible={pickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setPickerVisible(false)}
        >
          <Pressable
            style={styles.modalCard}
            onPress={(event) => event.stopPropagation()}
          >

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Select a Dish
              </Text>

              <TouchableOpacity
                onPress={() => setPickerVisible(false)}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={colors.darkBrown}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDescription}>
              Choose the dish you want to manage.
            </Text>

            {items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.selectionItem}
                onPress={() => handleItemSelected(item)}
              >
                <View style={styles.selectionInformation}>

                  <Text style={styles.selectionName}>
                    {item.dishName}
                  </Text>

                  <Text style={styles.selectionPrice}>
                    R{Number(item.price).toFixed(2)}
                  </Text>

                </View>

                <Ionicons
                  name="chevron-forward"
                  size={19}
                  color={colors.gold}
                />
              </TouchableOpacity>
            ))}

          </Pressable>
        </Pressable>
      </Modal>

      {/* ===================================
          CHANGE PRICE MODAL
      =================================== */}

      <Modal
        visible={priceModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPriceModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setPriceModalVisible(false)}
        >
          <Pressable
            style={styles.modalCard}
            onPress={(event) => event.stopPropagation()}
          >

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Change Price
              </Text>

              <TouchableOpacity
                onPress={() => setPriceModalVisible(false)}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={colors.darkBrown}
                />
              </TouchableOpacity>
            </View>

            {selectedItem ? (
              <>
                <Text style={styles.selectedDish}>
                  {selectedItem.dishName}
                </Text>

                <Text style={styles.priceLabel}>
                  New Price
                </Text>

                <View style={styles.priceInputContainer}>
                  <Text style={styles.currency}>
                    R
                  </Text>

                  <TextInput
                    style={styles.priceInput}
                    value={newPrice}
                    onChangeText={setNewPrice}
                    keyboardType="decimal-pad"
                    placeholder="0.00"
                    placeholderTextColor="#9A8975"
                  />
                </View>

                <TouchableOpacity
                  style={styles.savePriceButton}
                  onPress={handleSavePrice}
                >
                  <Text style={styles.savePriceText}>
                    SAVE NEW PRICE
                  </Text>
                </TouchableOpacity>
              </>
            ) : null}

          </Pressable>
        </Pressable>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 45,
  },

  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.darkBrown,
    marginTop: 8,
  },

  subheading: {
    fontSize: 14,
    color: colors.brown,
    lineHeight: 21,
    marginTop: 6,
    marginBottom: 20,
  },

  itemCard: {
    backgroundColor: colors.cream,
    borderRadius: 17,
    padding: 18,
    marginBottom: 12,
  },

  itemInformation: {
    flex: 1,
  },

  itemName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.darkBrown,
  },

  itemDescription: {
    fontSize: 13,
    color: colors.brown,
    lineHeight: 19,
    marginTop: 6,
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.gold,
    marginTop: 9,
  },

  emptyCard: {
    backgroundColor: colors.cream,
    borderRadius: 18,
    padding: 30,
    alignItems: 'center',
    marginBottom: 15,
  },

  emptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.lightBrown,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.darkBrown,
    marginBottom: 5,
  },

  emptyText: {
    fontSize: 14,
    color: colors.brown,
    textAlign: 'center',
  },

  addButton: {
    backgroundColor: colors.darkBrown,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  addButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
    marginLeft: 8,
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  secondaryButton: {
    width: '48.5%',
    backgroundColor: colors.cream,
    borderRadius: 14,
    minHeight: 58,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButtonText: {
    color: colors.darkBrown,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginLeft: 6,
  },

  removeButton: {
    backgroundColor: colors.cream,
    borderRadius: 14,
    minHeight: 55,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D8BABA',
  },

  removeButtonText: {
    color: colors.red,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.7,
    marginLeft: 7,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  modalCard: {
    backgroundColor: colors.cream,
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.darkBrown,
  },

  modalDescription: {
    fontSize: 13,
    color: colors.brown,
    marginTop: 5,
    marginBottom: 15,
  },

  selectionItem: {
    backgroundColor: colors.lightBrown,
    borderRadius: 13,
    padding: 15,
    marginBottom: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectionInformation: {
    flex: 1,
  },

  selectionName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.darkBrown,
  },

  selectionPrice: {
    fontSize: 13,
    color: colors.gold,
    fontWeight: '700',
    marginTop: 4,
  },

  selectedDish: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.darkBrown,
    marginTop: 15,
    marginBottom: 20,
  },

  priceLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.brown,
    marginBottom: 7,
  },

  priceInputContainer: {
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.lightBrown,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  currency: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.darkBrown,
    marginRight: 8,
  },

  priceInput: {
    flex: 1,
    fontSize: 17,
    color: colors.darkBrown,
    fontWeight: '600',
  },

  savePriceButton: {
    backgroundColor: colors.darkBrown,
    borderRadius: 13,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 16,
  },

  savePriceText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
});