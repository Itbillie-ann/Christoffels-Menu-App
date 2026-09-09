import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

export default function Toolbar({
  navigation,
  title = 'Kitchen by Christoffel',
  onIconPress,
  dark = true,
  rightIcon = 'restaurant-outline',
  onBackPress,
}) {
  const fg = dark
    ? colors.goldLight
    : colors.textDark;

  const bg = dark
    ? 'rgba(255,255,255,0.12)'
    : 'rgba(0,0,0,0.08)';

  // -----------------------------------
  // BACK BUTTON
  // -----------------------------------

  const handleBack = () => {
    // A custom back function can be supplied
    // by a screen when it needs special behaviour.
    if (onBackPress) {
      onBackPress();
      return;
    }

    // If another screen exists behind the
    // current screen, simply go back.
    if (navigation?.canGoBack()) {
      navigation.goBack();
      return;
    }

    // Only ask about leaving when there is
    // genuinely nowhere else to go.
    Alert.alert(
      'Leave App?',
      'Are you sure you want to leave Christoffel’s Menu?',
      [
        {
          text: 'Stay',
          style: 'cancel',
        },
        {
          text: 'Leave App',
          style: 'destructive',
          onPress: () => BackHandler.exitApp(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

      {/* BACK BUTTON */}
      <TouchableOpacity
        style={[
          styles.circleButton,
          {
            backgroundColor: bg,
          },
        ]}
        onPress={handleBack}
      >
        <Ionicons
          name="chevron-back"
          size={20}
          color={fg}
        />
      </TouchableOpacity>

      {/* TITLE */}
      <Text
        style={[
          styles.title,
          {
            color: fg,
          },
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>

      {/* RIGHT BUTTON */}
      <TouchableOpacity
        style={[
          styles.circleButton,
          {
            backgroundColor: bg,
          },
        ]}
        onPress={onIconPress}
        disabled={!onIconPress}
      >
        <Ionicons
          name={rightIcon}
          size={19}
          color={fg}
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  circleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    marginHorizontal: 12,
  },
});