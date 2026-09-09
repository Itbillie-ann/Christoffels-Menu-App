import React, { useState } from 'react';

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

export default function PaymentMethodsScreen({
  navigation,
}) {
  const [paymentMethods, setPaymentMethods] =
    useState([]);

  const [modalVisible, setModalVisible] =
    useState(false);

  const [cardholderName, setCardholderName] =
    useState('');

  const [cardNumber, setCardNumber] =
    useState('');

  const [expiry, setExpiry] =
    useState('');

  const openAddPaymentMethod = () => {
    setCardholderName('');
    setCardNumber('');
    setExpiry('');
    setModalVisible(true);
  };

  const savePaymentMethod = () => {
    const cleanNumber =
      cardNumber.replace(/\s/g, '');

    if (!cardholderName.trim()) {
      Alert.alert(
        'Name Required',
        'Please enter the cardholder name.'
      );
      return;
    }

    if (cleanNumber.length < 12) {
      Alert.alert(
        'Invalid Card',
        'Please enter a valid demo card number.'
      );
      return;
    }

    if (!expiry.trim()) {
      Alert.alert(
        'Expiry Required',
        'Please enter the expiry date.'
      );
      return;
    }

    const lastFour =
      cleanNumber.slice(-4);

    const newMethod = {
      name: cardholderName.trim(),
      number: `Card ending in •••• ${lastFour}`,
    };

    setPaymentMethods((current) => [
      ...current,
      newMethod,
    ]);

    setModalVisible(false);

    Alert.alert(
      'Payment Method Added',
      'Your payment method has been added successfully.'
    );
  };

  const removePaymentMethod = (index) => {
    Alert.alert(
      'Remove Payment Method',
      'Are you sure you want to remove this payment method?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setPaymentMethods((current) =>
              current.filter(
                (_, i) => i !== index
              )
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Toolbar
        navigation={navigation}
        title="Payment Methods"
        dark={false}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>
          Payment Methods
        </Text>

        <Text style={styles.description}>
          Manage the payment methods used for your
          Christoffel orders.
        </Text>

        {paymentMethods.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.cardIcon}>
              <Ionicons
                name="card-outline"
                size={38}
                color={colors.gold}
              />
            </View>

            <Text style={styles.emptyTitle}>
              No payment methods
            </Text>

            <Text style={styles.emptyText}>
              You have not added a payment method yet.
            </Text>
          </View>
        ) : (
          paymentMethods.map((method, index) => (
            <View
              style={styles.paymentCard}
              key={`${method.number}-${index}`}
            >
              <View style={styles.paymentLeft}>
                <Ionicons
                  name="card"
                  size={30}
                  color={colors.gold}
                />

                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentName}>
                    {method.name}
                  </Text>

                  <Text style={styles.paymentNumber}>
                    {method.number}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() =>
                  removePaymentMethod(index)
                }
              >
                <Ionicons
                  name="trash-outline"
                  size={21}
                  color={colors.red}
                />
              </TouchableOpacity>
            </View>
          ))
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={openAddPaymentMethod}
        >
          <Ionicons
            name="add-circle-outline"
            size={21}
            color={colors.white}
          />

          <Text style={styles.addButtonText}>
            ADD PAYMENT METHOD
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ADD PAYMENT METHOD MODAL */}

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
              <Text style={styles.modalTitle}>
                Add Payment Method
              </Text>

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

            <Text style={styles.note}>
              Demo payment form — do not enter a real
              card or CVV.
            </Text>

            <Text style={styles.inputLabel}>
              Cardholder Name
            </Text>

            <TextInput
              style={styles.input}
              value={cardholderName}
              onChangeText={setCardholderName}
              placeholder="e.g. Christoffel User"
              placeholderTextColor="#9A8975"
            />

            <Text style={styles.inputLabel}>
              Card Number
            </Text>

            <TextInput
              style={styles.input}
              value={cardNumber}
              onChangeText={setCardNumber}
              placeholder="0000 0000 0000 0000"
              placeholderTextColor="#9A8975"
              keyboardType="numeric"
              maxLength={19}
            />

            <Text style={styles.inputLabel}>
              Expiry Date
            </Text>

            <TextInput
              style={styles.input}
              value={expiry}
              onChangeText={setExpiry}
              placeholder="MM/YY"
              placeholderTextColor="#9A8975"
              keyboardType="numeric"
              maxLength={5}
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={savePaymentMethod}
            >
              <Text style={styles.saveButtonText}>
                SAVE PAYMENT METHOD
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

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.darkBrown,
    marginBottom: 7,
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.brown,
    marginBottom: 22,
  },

  emptyCard: {
    backgroundColor: colors.cream,
    borderRadius: 18,
    padding: 30,
    alignItems: 'center',
  },

  cardIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.lightBrown,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.darkBrown,
    marginBottom: 7,
  },

  emptyText: {
    fontSize: 14,
    color: colors.brown,
    textAlign: 'center',
    lineHeight: 20,
  },

  paymentCard: {
    backgroundColor: colors.cream,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  paymentInfo: {
    marginLeft: 14,
    flex: 1,
  },

  paymentName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.darkBrown,
  },

  paymentNumber: {
    fontSize: 13,
    color: colors.brown,
    marginTop: 4,
  },

  addButton: {
    backgroundColor: colors.darkBrown,
    borderRadius: 14,
    paddingVertical: 15,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 13,
    marginLeft: 8,
    letterSpacing: 0.8,
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: colors.darkBrown,
    flex: 1,
    paddingRight: 10,
  },

  note: {
    fontSize: 11,
    color: colors.brown,
    lineHeight: 16,
    marginTop: 6,
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.brown,
    marginTop: 14,
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
    letterSpacing: 0.7,
  },
});