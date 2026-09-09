import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
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
};

export default function AccountDetailsScreen({
  navigation,
}) {
  const [accountName, setAccountName] =
    useState('Christoffel User');

  const [email, setEmail] =
    useState('user@example.com');

  const [editVisible, setEditVisible] =
    useState(false);

  const [editName, setEditName] =
    useState(accountName);

  const [editEmail, setEditEmail] =
    useState(email);

  const openEditAccount = () => {
    setEditName(accountName);
    setEditEmail(email);
    setEditVisible(true);
  };

  const saveAccountDetails = () => {
    if (!editName.trim()) {
      Alert.alert(
        'Name Required',
        'Please enter an account name.'
      );
      return;
    }

    if (!editEmail.trim()) {
      Alert.alert(
        'Email Required',
        'Please enter an email address.'
      );
      return;
    }

    setAccountName(editName.trim());
    setEmail(editEmail.trim());

    setEditVisible(false);

    Alert.alert(
      'Account Updated',
      'Your account details have been updated successfully.'
    );
  };

  return (
    <View style={styles.container}>
      <Toolbar
        navigation={navigation}
        title="Account Details"
        dark={false}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>
          Account Information
        </Text>

        <Text style={styles.description}>
          Manage the information connected to your
          Christoffel account.
        </Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Ionicons
                name="person-outline"
                size={22}
                color={colors.gold}
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.label}>
                Account Name
              </Text>

              <Text style={styles.value}>
                {accountName}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Ionicons
                name="mail-outline"
                size={22}
                color={colors.gold}
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.label}>
                Email Address
              </Text>

              <Text style={styles.value}>
                {email}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color={colors.gold}
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.label}>
                Account Status
              </Text>

              <Text style={styles.value}>
                Active
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={openEditAccount}
        >
          <Ionicons
            name="create-outline"
            size={20}
            color={colors.white}
          />

          <Text style={styles.buttonText}>
            EDIT ACCOUNT DETAILS
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* EDIT ACCOUNT MODAL */}

      <Modal
        visible={editVisible}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setEditVisible(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Edit Account Details
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setEditVisible(false)
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
              Account Name
            </Text>

            <TextInput
              style={styles.input}
              value={editName}
              onChangeText={setEditName}
              placeholder="Account name"
              placeholderTextColor="#9A8975"
            />

            <Text style={styles.inputLabel}>
              Email Address
            </Text>

            <TextInput
              style={styles.input}
              value={editEmail}
              onChangeText={setEditEmail}
              placeholder="Email address"
              placeholderTextColor="#9A8975"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveAccountDetails}
            >
              <Text style={styles.saveButtonText}>
                SAVE CHANGES
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

  card: {
    backgroundColor: colors.cream,
    borderRadius: 18,
    padding: 20,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.lightBrown,
    alignItems: 'center',
    justifyContent: 'center',
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  label: {
    fontSize: 12,
    color: colors.brown,
    marginBottom: 3,
  },

  value: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkBrown,
  },

  divider: {
    height: 1,
    backgroundColor: '#D9C9B2',
    marginVertical: 18,
  },

  button: {
    backgroundColor: colors.darkBrown,
    borderRadius: 14,
    paddingVertical: 15,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
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

  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.brown,
    marginTop: 15,
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