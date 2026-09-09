import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  useMenu,
  COURSES,
} from './Context/MenuContext';

export default function MenuScreen({
  navigation,
}) {
  const { getItemsByCourse } = useMenu();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        padding: 24,
        paddingTop: 45,
        paddingBottom: 45,
      }}
      showsVerticalScrollIndicator={false}
    >

      {/* BACK */}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}
      >
        <Text style={styles.backText}>
          ‹ Back
        </Text>
      </TouchableOpacity>

      {/* TITLE */}

      <Text style={styles.menuTitle}>
        FULL MENU
      </Text>

      <Text style={styles.subtitle}>
        Christoffel’s Home-Style Cape Cooking
      </Text>

      {/* ALL COURSES */}

      {COURSES.map((course) => {
        const items =
          getItemsByCourse(course);

        return (
          <View
            key={course}
            style={styles.section}
          >

            <Text style={styles.sectionTitle}>
              {course.toUpperCase()}
            </Text>

            <View style={styles.divider} />

            {items.length > 0 ? (
              items.map((item) => (
                <View
                  key={item.id}
                  style={styles.itemContainer}
                >

                  <View style={styles.itemInfo}>

                    <Text style={styles.dishName}>
                      {item.dishName}
                    </Text>

                    {item.description ? (
                      <Text
                        style={styles.description}
                      >
                        {item.description}
                      </Text>
                    ) : null}

                  </View>

                  <Text style={styles.price}>
                    R
                    {Number(item.price).toFixed(0)}
                  </Text>

                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>
                No items currently listed.
              </Text>
            )}

          </View>
        );
      })}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#D5B88A',
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 18,
  },

  backText: {
    color: '#4A3A28',
    fontSize: 15,
    fontWeight: '500',
  },

  menuTitle: {
    fontSize: 27,
    fontWeight: '700',
    color: '#2B2320',
    textAlign: 'center',
    letterSpacing: 3,
  },

  subtitle: {
    fontSize: 11,
    color: '#5C4A38',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 35,
  },

  section: {
    marginBottom: 35,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2B2320',
    textAlign: 'center',
    letterSpacing: 2,
  },

  divider: {
    height: 2,
    backgroundColor: '#8A2E1F',
    width: '60%',
    alignSelf: 'center',
    marginVertical: 10,
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#B58D5A',
  },

  itemInfo: {
    flex: 1,
    paddingRight: 15,
  },

  dishName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2B2320',
  },

  description: {
    fontSize: 11,
    color: '#5C4A38',
    lineHeight: 16,
    marginTop: 4,
  },

  price: {
    fontSize: 14,
    color: '#2B2320',
    fontWeight: '700',
  },

  emptyText: {
    textAlign: 'center',
    color: '#6B5946',
    fontSize: 12,
    fontStyle: 'italic',
    paddingVertical: 10,
  },

});
