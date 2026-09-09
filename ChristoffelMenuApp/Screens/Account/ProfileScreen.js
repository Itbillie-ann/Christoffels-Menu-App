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
  red: '#9B3D3D',
};

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('Christoffel User');
  const [email, setEmail] = useState('user@example.com');
  const [phone, setPhone] = useState('Not added');

  const [editVisible, setEditVisible] = useState(false);

  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);
  const [editPhone, setEditPhone] = useState(
    phone === 'Not added' ? '' : phone
  );

  const openEditProfile = () => {
    setEditName(name);
    setEditEmail(email);
    setEditPhone(
      phone === 'Not added' ? '' : phone
    );

    setEditVisible(true);
  };

  const saveProfile = () => {
    if (!editName.trim()) {
      Alert.alert(
        'Name Required',
        'Please enter your name.'
      );
      return;
    }

    if (!editEmail.trim()) {
      Alert.alert(
        'Email Required',
        'Please enter your email address.'
      );
      return;
    }

    setName(editName.trim());
    setEmail(editEmail.trim());
    setPhone(
      editPhone.trim()
        ? editPhone.trim()
        : 'Not added'
    );

    setEditVisible(false);

    Alert.alert(
      'Profile Updated',
      'Your profile has been updated successfully.'
    );
  };

  return (
    <View style={styles.container}>
      <Toolbar
        navigation={navigation}
        title="Profile"
        dark={false}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCircle}>
          <Ionicons
            name="person"
            size={48}
            color={colors.gold}
          />
        </View>

        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.subtitle}>
          Restaurant Account
        </Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="person-outline"
              size={22}
              color={colors.gold}
            />

            <View style={styles.info}>
              <Text style={styles.label}>
                Name
              </Text>

              <Text style={styles.value}>
                {name}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Ionicons
              name="mail-outline"
              size={22}
              color={colors.gold}
            />

            <View style={styles.info}>
              <Text style={styles.label}>
                Email
              </Text>

              <Text style={styles.value}>
                {email}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Ionicons
              name="call-outline"
              size={22}
              color={colors.gold}
            />

            <View style={styles.info}>
              <Text style={styles.label}>
                Phone
              </Text>

              <Text style={styles.value}>
                {phone}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={openEditProfile}
        >
          <Ionicons
            name="create-outline"
            size={20}
            color={colors.white}
          />

          <Text style={styles.buttonText}>
            EDIT PROFILE
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* EDIT PROFILE MODAL */}

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
                Edit Profile
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
              Name
            </Text>

            <TextInput
              style={styles.input}
              value={editName}
              onChangeText={setEditName}
              placeholder="Your name"
              placeholderTextColor="#9A8975"
            />

            <Text style={styles.inputLabel}>
              Email
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

            <Text style={styles.inputLabel}>
              Phone
            </Text>

            <TextInput
              style={styles.input}
              value={editPhone}
              onChangeText={setEditPhone}
              placeholder="Phone number"
              placeholderTextColor="#9A8975"
              keyboardType="phone-pad"
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveProfile}
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
    alignItems: 'center',
  },

  profileCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.gold,
  },

  name: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.darkBrown,
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    color: colors.brown,
    marginBottom: 25,
  },

  card: {
    width: '100%',
    backgroundColor: colors.cream,
    borderRadius: 18,
    padding: 20,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  info: {
    marginLeft: 15,
    flex: 1,
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
    width: '100%',
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
    fontSize: 14,
    marginLeft: 8,
    letterSpacing: 1,
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
    marginBottom: 10,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.darkBrown,
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.brown,
    marginTop: 13,
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