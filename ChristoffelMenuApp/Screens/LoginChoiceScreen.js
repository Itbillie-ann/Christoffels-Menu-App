import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import Toolbar from './Components/Toolbar';

export default function LoginChoiceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeLetter}>C</Text>
        </View>
        <Text style={styles.wordmark}>Christoffel's</Text>
        <Text style={styles.tagline}>HOME-STYLE CAPE COOKING</Text>

        <Ionicons name="restaurant-outline" size={40} color={colors.gold} style={styles.icon} />

        {/* Returning users skip straight to the dashboard */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Home')}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        {/* New / registering users go through the Sign In form */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>

     <Toolbar
  navigation={navigation}
  title="Kitchen by Christoffel"
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.espresso, justifyContent: 'space-between' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  badge: { width: 90, height: 90, borderRadius: 45, borderWidth: 2, borderColor: colors.gold, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  badgeLetter: { color: colors.goldLight, fontSize: 36, fontWeight: '700' },
  wordmark: { color: colors.goldLight, fontSize: 24, fontWeight: '700', marginBottom: 4 },
  tagline: { color: colors.gold, fontSize: 11, letterSpacing: 2 },
  icon: { marginVertical: 26 },
  button: { backgroundColor: colors.gold, borderRadius: 12, paddingVertical: 14, alignItems: 'center', width: '100%', marginBottom: 14 },
  buttonText: { color: colors.textDark, fontWeight: '700', fontSize: 15, letterSpacing: 1 },
});