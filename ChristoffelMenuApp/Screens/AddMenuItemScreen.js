
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from './Context/MenuContext';

export default function AddMenuItemScreen({ navigation, route }) {
  const { addMenuItem, updateMenuItem } = useMenu();

  // Get the existing item if we are editing.
  const itemToEdit = route.params?.item;
  const preselectedCourse = route.params?.course;

  const isEditing = Boolean(itemToEdit);

  // Form fields
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(
    preselectedCourse || 'Appetizers'
  );
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});

  // Populate the form when editing an existing item.
  useEffect(() => {
    if (itemToEdit) {
      setDishName(itemToEdit.dishName || '');
      setDescription(itemToEdit.description || '');
      setCourse(itemToEdit.course || 'Appetizers');
      setPrice(String(itemToEdit.price ?? ''));
    } else {
      setDishName('');
      setDescription('');
      setCourse(preselectedCourse || 'Appetizers');
      setPrice('');
    }

    setErrors({});
  }, [itemToEdit, preselectedCourse]);

  // Validate the form.
  const validate = () => {
    const newErrors = {};

    if (!dishName.trim()) {
      newErrors.dishName = 'Dish name is required.';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required.';
    }

    const numericPrice = Number(price);

    if (!price.trim()) {
      newErrors.price = 'Price is required.';
    } else if (!Number.isFinite(numericPrice)) {
      newErrors.price = 'Please enter a valid price.';
    } else if (numericPrice < 0) {
      newErrors.price = 'Price cannot be negative.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Save a new item OR update an existing item.
  const handleSave = () => {
    if (!validate()) return;

    const updatedData = {
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: Number(price),
    };

    if (isEditing) {
      // Update the existing item using its original ID.
      updateMenuItem(itemToEdit.id, updatedData);

      Alert.alert(
        'Success',
        `${updatedData.dishName} was updated successfully.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    } else {
      // Add a completely new item.
      addMenuItem(updatedData);

      Alert.alert(
        'Success',
        `${updatedData.dishName} was added to the menu.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        padding: 24,
        paddingTop: 60,
      }}
    >
      <Text style={styles.title}>
        {isEditing ? 'Edit Menu Item' : 'Add Item'}
      </Text>

      <Text style={styles.label}>Dish Name</Text>

      <TextInput
        style={styles.input}
        value={dishName}
        onChangeText={setDishName}
        placeholder="e.g. Bobotie"
      />

      {errors.dishName && (
        <Text style={styles.error}>{errors.dishName}</Text>
      )}

      <Text style={styles.label}>Description</Text>

      <TextInput
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Describe the dish..."
        multiline
      />

      {errors.description && (
        <Text style={styles.error}>{errors.description}</Text>
      )}

      <Text style={styles.label}>Course</Text>

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={course}
          onValueChange={setCourse}
        >
          <Picker.Item label="Appetizers" value="Appetizers" />
          <Picker.Item label="Entrées" value="Entrées" />
          <Picker.Item label="Desserts" value="Desserts" />
          <Picker.Item label="Drinks" value="Drinks" />
        </Picker>
      </View>

      <Text style={styles.label}>Price (R)</Text>

      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="0.00"
        keyboardType="decimal-pad"
      />

      {errors.price && (
        <Text style={styles.error}>{errors.price}</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          {isEditing ? 'Update Item' : 'Save Item'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7EFE1',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2B2320',
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#8a7c6f',
    textTransform: 'uppercase',
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8dcc8',
    padding: 12,
    fontSize: 14,
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8dcc8',
  },
  error: {
    color: '#b5482a',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#D99A3F',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  buttonText: {
    color: '#2B2320',
    fontWeight: '700',
    fontSize: 15,
  },
});
