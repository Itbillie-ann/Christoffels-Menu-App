import React, { useMemo, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Toolbar from '../Components/Toolbar';

import { useMenu } from '../Context/MenuContext';

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

export default function OrderFoodScreen({
  navigation,
}) {
  const { menuItems } = useMenu();

  const [orderItems, setOrderItems] =
    useState([]);

  const [selectedDish, setSelectedDish] =
    useState(null);

  const [ingredient, setIngredient] =
    useState('');

  const [quantity, setQuantity] =
    useState('');

  const [modalVisible, setModalVisible] =
    useState(false);

  const categories = [
    'Appetizers',
    'Entrées',
    'Desserts',
    'Drinks',
  ];

  const groupedItems = useMemo(() => {
    return categories.map((category) => ({
      category,
      items: menuItems.filter(
        (item) => item.course === category
      ),
    }));
  }, [menuItems]);

  const openIngredientOrder = (item) => {
    setSelectedDish(item);
    setIngredient('');
    setQuantity('');
    setModalVisible(true);
  };

  const addIngredientToOrder = () => {
    if (!ingredient.trim()) {
      Alert.alert(
        'Ingredient Required',
        'Please enter the ingredient you need.'
      );
      return;
    }

    if (!quantity.trim()) {
      Alert.alert(
        'Quantity Required',
        'Please enter the quantity you need.'
      );
      return;
    }

    const newOrderItem = {
      id: `${Date.now()}-${Math.random()}`,
      dishName: selectedDish.dishName,
      ingredient: ingredient.trim(),
      quantity: quantity.trim(),
    };

    setOrderItems((current) => [
      ...current,
      newOrderItem,
    ]);

    setIngredient('');
    setQuantity('');
    setModalVisible(false);

    Alert.alert(
      'Ingredient Added',
      `${ingredient.trim()} has been added to your ingredient order.`
    );
  };

  const removeOrderItem = (id) => {
    setOrderItems((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const submitIngredientOrder = () => {
    if (orderItems.length === 0) {
      Alert.alert(
        'No Ingredients',
        'Add at least one ingredient before submitting your order.'
      );
      return;
    }

    Alert.alert(
      'Order Submitted',
      `Your ingredient order contains ${orderItems.length} item${
        orderItems.length === 1 ? '' : 's'
      }.`,
      [
        {
          text: 'OK',
          onPress: () => setOrderItems([]),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Toolbar
        navigation={navigation}
        title="Order Ingredients"
        dark={false}
      />

      {/* ORDER SUMMARY BAR */}

      <View style={styles.orderBar}>
        <View>
          <Text style={styles.orderLabel}>
            INGREDIENT ORDER
          </Text>

          <Text style={styles.orderCount}>
            {orderItems.length}{' '}
            {orderItems.length === 1
              ? 'ITEM'
              : 'ITEMS'}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.orderButton,
            orderItems.length === 0 &&
              styles.orderButtonDisabled,
          ]}
          onPress={submitIngredientOrder}
        >
          <Ionicons
            name="cart-outline"
            size={19}
            color={colors.white}
          />

          <Text style={styles.orderButtonText}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>
          Order Ingredients
        </Text>

        <Text style={styles.description}>
          Select a dish and add the ingredients you
          need to order for your kitchen.
        </Text>

        {groupedItems.map((section) => (
          <View
            key={section.category}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>
              {section.category.toUpperCase()}
            </Text>

            {section.items.length === 0 ? (
              <View style={styles.emptySection}>
                <Text style={styles.emptyText}>
                  No dishes available yet.
                </Text>
              </View>
            ) : (
              section.items.map((item) => (
                <View
                  key={item.id}
                  style={styles.itemCard}
                >
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>
                      {item.dishName}
                    </Text>

                    {item.description ? (
                      <Text
                        style={styles.itemDescription}
                        numberOfLines={2}
                      >
                        {item.description}
                      </Text>
                    ) : null}
                  </View>

                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() =>
                      openIngredientOrder(item)
                    }
                  >
                    <Ionicons
                      name="add"
                      size={20}
                      color={colors.white}
                    />

                    <Text style={styles.addButtonText}>
                      ORDER
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        ))}

        {/* CURRENT INGREDIENT ORDER */}

        {orderItems.length > 0 ? (
          <View style={styles.orderList}>
            <Text style={styles.orderListTitle}>
              CURRENT ORDER
            </Text>

            {orderItems.map((item) => (
              <View
                key={item.id}
                style={styles.ingredientCard}
              >
                <View style={styles.ingredientInfo}>
                  <Text style={styles.ingredientName}>
                    {item.ingredient}
                  </Text>

                  <Text style={styles.ingredientDish}>
                    For: {item.dishName}
                  </Text>

                  <Text style={styles.ingredientQuantity}>
                    Quantity: {item.quantity}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    removeOrderItem(item.id)
                  }
                >
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={colors.red}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>

      {/* ADD INGREDIENT MODAL */}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setModalVisible(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>
                  Order Ingredients
                </Text>

                {selectedDish ? (
                  <Text style={styles.selectedDish}>
                    For: {selectedDish.dishName}
                  </Text>
                ) : null}
              </View>

              <TouchableOpacity
                onPress={() =>
                  setModalVisible(false)
                }
              >
                <Ionicons
                  name="close"
                  size={25}
                  color={colors.darkBrown}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>
              Ingredient
            </Text>

            <TextInput
              style={styles.input}
              value={ingredient}
              onChangeText={setIngredient}
              placeholder="e.g. Beef mince"
              placeholderTextColor="#9A8975"
            />

            <Text style={styles.inputLabel}>
              Quantity
            </Text>

            <TextInput
              style={styles.input}
              value={quantity}
              onChangeText={setQuantity}
              placeholder="e.g. 5 kg"
              placeholderTextColor="#9A8975"
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={addIngredientToOrder}
            >
              <Text style={styles.saveButtonText}>
                ADD TO ORDER
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
  },

  orderBar: {
    backgroundColor: colors.cream,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  orderLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.3,
    color: colors.brown,
  },

  orderCount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.darkBrown,
    marginTop: 2,
  },

  orderButton: {
    minWidth: 92,
    height: 43,
    paddingHorizontal: 13,
    borderRadius: 12,
    backgroundColor: colors.darkBrown,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  orderButtonDisabled: {
    opacity: 0.5,
  },

  orderButtonText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 12,
    marginLeft: 7,
    letterSpacing: 0.5,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 45,
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.darkBrown,
    marginBottom: 6,
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.brown,
    marginBottom: 25,
  },

  section: {
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: colors.darkBrown,
    marginBottom: 10,
  },

  emptySection: {
    backgroundColor: colors.cream,
    borderRadius: 14,
    padding: 15,
  },

  emptyText: {
    color: colors.brown,
    fontSize: 13,
  },

  itemCard: {
    backgroundColor: colors.cream,
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemInfo: {
    flex: 1,
    paddingRight: 10,
  },

  itemName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.darkBrown,
  },

  itemDescription: {
    fontSize: 12,
    color: colors.brown,
    lineHeight: 17,
    marginTop: 5,
  },

  addButton: {
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.darkBrown,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 4,
    letterSpacing: 0.5,
  },

  orderList: {
    marginTop: 5,
  },

  orderListTitle: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: colors.darkBrown,
    marginBottom: 10,
  },

  ingredientCard: {
    backgroundColor: colors.cream,
    borderRadius: 15,
    padding: 15,
    marginBottom: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  ingredientInfo: {
    flex: 1,
    paddingRight: 10,
  },

  ingredientName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.darkBrown,
  },

  ingredientDish: {
    fontSize: 12,
    color: colors.brown,
    marginTop: 4,
  },

  ingredientQuantity: {
    fontSize: 12,
    color: colors.gold,
    fontWeight: '700',
    marginTop: 3,
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
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  modalTitleContainer: {
    flex: 1,
    paddingRight: 10,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: colors.darkBrown,
  },

  selectedDish: {
    fontSize: 13,
    color: colors.gold,
    fontWeight: '700',
    marginTop: 5,
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.brown,
    marginTop: 16,
    marginBottom: 6,
    textTransform: 'uppercase',
  },

  input: {
    backgroundColor: colors.lightBrown,
    borderRadius: 11,
    paddingHorizontal: 13,
    paddingVertical: 13,
    fontSize: 15,
    color: colors.darkBrown,
  },

  saveButton: {
    backgroundColor: colors.darkBrown,
    borderRadius: 13,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 22,
  },

  saveButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
});