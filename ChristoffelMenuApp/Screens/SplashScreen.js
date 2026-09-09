import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('LoginChoice'), 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeLetter}>C</Text>
      </View>
      <Text style={styles.wordmark}>Christoffel's</Text>
      <Text style={styles.tagline}>HOME-STYLE CAPE COOKING</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.espresso, alignItems: 'center', justifyContent: 'center' },
  badge: { width: 110, height: 110, borderRadius: 55, borderWidth: 2, borderColor: colors.gold, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  badgeLetter: { color: colors.goldLight, fontSize: 44, fontWeight: '700' },
  wordmark: { color: colors.goldLight, fontSize: 26, fontWeight: '700', marginBottom: 6 },
  tagline: { color: colors.gold, fontSize: 12, letterSpacing: 2 },
});