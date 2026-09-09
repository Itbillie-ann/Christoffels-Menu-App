import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from './Context/MenuContext';

export default function AddMenuItemScreen({ navigation, route }) {
  const { addMenuItem } = useMenu();
  const preselectedCourse = route.params?.course;

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(preselectedCourse || 'Appetizers');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (preselectedCourse) setCourse(preselectedCourse);
  }, [preselectedCourse]);

  const validate = () => {
    const newErrors = {};
    if (!dishName.trim()) newErrors.dishName = 'Dish name is required.';
    if (!description.trim()) newErrors.description = 'Description is required.';
    if (!price.trim()) {
      newErrors.price = 'Price is required.';
    } else if (isNaN(parseFloat(price))) {
      newErrors.price = 'Price must be a number.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    addMenuItem({ dishName, description, course, price: parseFloat(price) });

    Alert.alert('Success', `${dishName} was added to the menu.`, [
      { text: 'OK', onPress: () => navigation.navigate('Home') },
    ]);

    setDishName('');
    setDescription('');
    setPrice('');
    setErrors({});
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24, paddingTop: 60 }}>
      <Text style={styles.title}>Add Item</Text>

      <Text style={styles.label}>Dish Name</Text>
      <TextInput style={styles.input} value={dishName} onChangeText={setDishName} placeholder="e.g. Bobotie" />
      {errors.dishName && <Text style={styles.error}>{errors.dishName}</Text>}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Describe the dish..."
        multiline
      />
      {errors.description && <Text style={styles.error}>{errors.description}</Text>}

      <Text style={styles.label}>Course</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={course} onValueChange={setCourse}>
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
        keyboardType="numeric"
      />
      {errors.price && <Text style={styles.error}>{errors.price}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7EFE1' },
  title: { fontSize: 24, fontWeight: '700', color: '#2B2320', marginBottom: 20 },
  label: { fontSize: 12, color: '#8a7c6f', textTransform: 'uppercase', marginBottom: 6, marginTop: 14 },
  input: { backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#e8dcc8', padding: 12, fontSize: 14 },
  pickerWrapper: { backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#e8dcc8' },
  error: { color: '#b5482a', fontSize: 12, marginTop: 4 },
  button: { backgroundColor: '#D99A3F', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 28 },
  buttonText: { color: '#2B2320', fontWeight: '700', fontSize: 15 },
});