import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  BackHandler,
  Modal,
  Pressable,
} from 'react-native';

import {
  useMenu,
  COURSES,
} from './Context/MenuContext';

export default function HomeScreen({ navigation }) {
  const {
    menuItems,
    getItemsByCourse,
    getAveragePrice,
  } = useMenu();

  const [moreMenuVisible, setMoreMenuVisible] =
    useState(false);

  // -----------------------------------
  // LEAVE APP CONFIRMATION
  // -----------------------------------

  const confirmExit = () => {
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

  // -----------------------------------
  // ANDROID BACK BUTTON
  // -----------------------------------

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        confirmExit();
      }

      return true;
    };

    const backHandler =
      BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

    return () => backHandler.remove();
  }, [navigation]);

  // -----------------------------------
  // HEADER BACK BUTTON
  // -----------------------------------

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      confirmExit();
    }
  };

  // -----------------------------------
  // CLOSE MORE MENU
  // -----------------------------------

  const closeMoreMenu = () => {
    setMoreMenuVisible(false);
  };

  // -----------------------------------
  // NAVIGATE FROM MORE MENU
  // -----------------------------------

  const navigateFromMoreMenu = (screen) => {
    closeMoreMenu();
    navigation.navigate(screen);
  };

  // -----------------------------------
  // LOGOUT
  // -----------------------------------

  const handleLogout = () => {
    closeMoreMenu();

    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () =>
            navigation.replace('LoginChoice'),
        },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          padding: 22,
          paddingTop: 20,
          paddingBottom: 35,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* -------------------------------- */}
        {/* TOP BAR */}
        {/* -------------------------------- */}

        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <Text style={styles.backText}>
              ‹
            </Text>

            <Text style={styles.backLabel}>
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.moreButton}
            onPress={() =>
              setMoreMenuVisible(true)
            }
          >
            <Text style={styles.moreDots}>
              ⋮
            </Text>
          </TouchableOpacity>
        </View>

        {/* -------------------------------- */}
        {/* WELCOME */}
        {/* -------------------------------- */}

        <View style={styles.headerRow}>
          <View>
            <Text style={styles.welcome}>
              Welcome
            </Text>

            <Text style={styles.title}>
              Christoffel
            </Text>
          </View>
        </View>

        {/* -------------------------------- */}
        {/* STATISTICS */}
        {/* -------------------------------- */}

        <View style={styles.statsRow}>
          <View
            style={[
              styles.statCard,
              {
                marginRight: 6,
              },
            ]}
          >
            <Text style={styles.statNumber}>
              {menuItems.length}
            </Text>

            <Text style={styles.statLabel}>
              Menu Items
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              {
                marginLeft: 6,
              },
            ]}
          >
            <Text style={styles.statNumber}>
              R{getAveragePrice().toFixed(0)}
            </Text>

            <Text style={styles.statLabel}>
              Avg. Price
            </Text>
          </View>
        </View>

        {/* -------------------------------- */}
        {/* MANAGE MENU */}
        {/* -------------------------------- */}

        <Text style={styles.manageLabel}>
          Manage Menu
        </Text>

        {COURSES.map((course) => (
          <TouchableOpacity
            key={course}
            style={styles.courseCard}
            onPress={() =>
              navigation.navigate(
                'Category',
                { course }
              )
            }
          >
            <View>
              <Text style={styles.courseName}>
                {course.toUpperCase()}
              </Text>

              <Text style={styles.courseCount}>
                {getItemsByCourse(course).length}{' '}
                ITEMS
              </Text>
            </View>

            <Text style={styles.chevron}>
              ›
            </Text>
          </TouchableOpacity>
        ))}

        {/* -------------------------------- */}
        {/* FULL MENU */}
        {/* -------------------------------- */}

        <TouchableOpacity
          style={styles.viewMenuButton}
          onPress={() =>
            navigation.navigate('Menu')
          }
        >
          <Text style={styles.viewMenuText}>
            View Full Menu
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ================================= */}
      {/* THREE-DOT MENU */}
      {/* ================================= */}

      <Modal
        visible={moreMenuVisible}
        transparent
        animationType="fade"
        onRequestClose={closeMoreMenu}
      >
        <Pressable
          style={styles.menuOverlay}
          onPress={closeMoreMenu}
        >
          <Pressable
            style={styles.moreMenu}
            onPress={(event) =>
              event.stopPropagation()
            }
          >
            {/* MENU HEADER */}

            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>
                Account & More
              </Text>

              <TouchableOpacity
                onPress={closeMoreMenu}
              >
                <Text style={styles.closeButton}>
                  ×
                </Text>
              </TouchableOpacity>
            </View>

            {/* PROFILE */}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                navigateFromMoreMenu('Profile')
              }
            >
              <Text style={styles.menuIcon}>
                👤
              </Text>

              <View style={styles.menuTextContainer}>
                <Text style={styles.menuItemTitle}>
                  Profile
                </Text>

                <Text style={styles.menuItemSubtitle}>
                  View and edit your profile
                </Text>
              </View>
            </TouchableOpacity>

            {/* ACCOUNT DETAILS */}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                navigateFromMoreMenu(
                  'AccountDetails'
                )
              }
            >
              <Text style={styles.menuIcon}>
                ◉
              </Text>

              <View style={styles.menuTextContainer}>
                <Text style={styles.menuItemTitle}>
                  Account Details
                </Text>

                <Text style={styles.menuItemSubtitle}>
                  Personal and account information
                </Text>
              </View>
            </TouchableOpacity>

            {/* PAYMENT METHODS */}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                navigateFromMoreMenu(
                  'PaymentMethods'
                )
              }
            >
              <Text style={styles.menuIcon}>
                💳
              </Text>

              <View style={styles.menuTextContainer}>
                <Text style={styles.menuItemTitle}>
                  Payment Methods
                </Text>

                <Text style={styles.menuItemSubtitle}>
                  Manage your payment options
                </Text>
              </View>
            </TouchableOpacity>

            {/* ORDER FOOD */}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                navigateFromMoreMenu(
                  'OrderFood'
                )
              }
            >
              <Text style={styles.menuIcon}>
                🍽
              </Text>

              <View style={styles.menuTextContainer}>
                <Text style={styles.menuItemTitle}>
                  Order Food
                </Text>

                <Text style={styles.menuItemSubtitle}>
                  Browse and order from the menu
                </Text>
              </View>
            </TouchableOpacity>

            {/* DIVIDER */}

            <View style={styles.menuDivider} />

            {/* LOGOUT */}

            <TouchableOpacity
              style={styles.logoutItem}
              onPress={handleLogout}
            >
              <Text style={styles.logoutIcon}>
                ↪
              </Text>

              <Text style={styles.logoutText}>
                Logout
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#B99A72',
  },

  container: {
    flex: 1,
  },

  // -----------------------------------
  // TOP BAR
  // -----------------------------------

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingRight: 10,
  },

  backText: {
    fontSize: 28,
    color: '#3A2B22',
    lineHeight: 28,
  },

  backLabel: {
    fontSize: 13,
    color: '#3A2B22',
    marginLeft: 2,
  },

  moreButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor:
      'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  moreDots: {
    fontSize: 27,
    color: '#2B2320',
    lineHeight: 28,
    marginTop: -4,
  },

  // -----------------------------------
  // HEADER
  // -----------------------------------

  headerRow: {
    marginBottom: 22,
  },

  welcome: {
    fontSize: 13,
    color: '#67472D',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#2B2320',
    marginTop: 2,
  },

  // -----------------------------------
  // STATISTICS
  // -----------------------------------

  statsRow: {
    flexDirection: 'row',
    marginBottom: 30,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#D8C3A2',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#A98961',
    paddingVertical: 18,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 27,
    fontWeight: '700',
    color: '#70491F',
  },

  statLabel: {
    fontSize: 12,
    color: '#5D4A38',
    marginTop: 3,
  },

  // -----------------------------------
  // MANAGE MENU
  // -----------------------------------

  manageLabel: {
    fontSize: 12,
    color: '#5D4A38',
    textTransform: 'uppercase',
    marginBottom: 11,
    letterSpacing: 1.2,
    fontWeight: '600',
  },

  courseCard: {
    backgroundColor: '#D5B88A',
    borderRadius: 13,
    paddingVertical: 17,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 11,
    borderWidth: 1,
    borderColor: '#B08B5D',
  },

  courseName: {
    fontWeight: '700',
    fontSize: 15,
    color: '#2B2320',
    letterSpacing: 0.4,
  },

  courseCount: {
    fontSize: 11,
    color: '#634C35',
    marginTop: 3,
  },

  chevron: {
    fontSize: 27,
    color: '#4C3628',
  },

  // -----------------------------------
  // FULL MENU
  // -----------------------------------

  viewMenuButton: {
    backgroundColor: '#2B2320',
    borderRadius: 13,
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 7,
  },

  viewMenuText: {
    color: '#F4DAB1',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.3,
  },

  // -----------------------------------
  // MORE MENU OVERLAY
  // -----------------------------------

  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 68,
    paddingRight: 15,
  },

  moreMenu: {
    width: 290,
    backgroundColor: '#F7EFE1',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 7,
    elevation: 10,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 9,
  },

  menuTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2B2320',
  },

  closeButton: {
    fontSize: 27,
    color: '#8A7C6F',
    lineHeight: 27,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  menuIcon: {
    width: 38,
    fontSize: 19,
  },

  menuTextContainer: {
    flex: 1,
  },

  menuItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2B2320',
  },

  menuItemSubtitle: {
    fontSize: 10,
    color: '#8A7C6F',
    marginTop: 2,
  },

  menuDivider: {
    height: 1,
    backgroundColor: '#E1D3BE',
    marginVertical: 5,
    marginHorizontal: 10,
  },

  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },

  logoutIcon: {
    width: 38,
    fontSize: 20,
    color: '#8A2E1F',
  },

  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8A2E1F',
  },
});