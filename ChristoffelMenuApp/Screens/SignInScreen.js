import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';
import Toolbar from './Components/Toolbar';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter both an email address and a password.');
      return;
    }
    setError('');
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeLetter}>C</Text>
        </View>
        <Text style={styles.wordmark}>Christoffel's</Text>
        <Text style={styles.tagline}>HOME-STYLE CAPE COOKING</Text>

        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor={colors.textMuted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>

      <Toolbar navigation={navigation} title="Kitchen by Christoffel" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.espresso, justifyContent: 'space-between' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  badge: { width: 90, height: 90, borderRadius: 45, borderWidth: 2, borderColor: colors.gold, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  badgeLetter: { color: colors.goldLight, fontSize: 36, fontWeight: '700' },
  wordmark: { color: colors.goldLight, fontSize: 24, fontWeight: '700', marginBottom: 4 },
  tagline: { color: colors.gold, fontSize: 11, letterSpacing: 2, marginBottom: 28 },
  input: { backgroundColor: colors.goldLight, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, width: '100%', marginBottom: 14, color: colors.textDark },
  error: { color: '#e08a6a', fontSize: 12, marginBottom: 10, textAlign: 'center' },
  button: { backgroundColor: colors.gold, borderRadius: 12, paddingVertical: 14, alignItems: 'center', width: '100%', marginTop: 6 },
  buttonText: { color: colors.textDark, fontWeight: '700', fontSize: 15, letterSpacing: 1 },
});