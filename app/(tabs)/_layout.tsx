import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true, // Enable labels for tabs
          tabBarStyle: [styles.tabBar, { backgroundColor: '#1054CF' }], // Change background color to #1054CF
          tabBarLabelStyle: styles.tabBarLabel, // Style for labels
          tabBarIconStyle: styles.tabBarIcon, // Adjust icon position
          tabBarActiveTintColor: '#FFFFFF', // White color for selected icons and labels
          tabBarInactiveTintColor: '#ccc', // Gray color for unselected icons and labels
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
            ),
            tabBarLabel: 'Home',
          }}
        />
        <Tabs.Screen
          name="rent"
          options={{
            title: 'Rent',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'car' : 'car-outline'} size={24} color={color} />
            ),
            tabBarLabel: 'Rental',
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            title: 'Chats',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'chatbubbles' : 'chatbubbles-outline'} size={24} color={color} />
            ),
            tabBarLabel: 'Chats',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome5 name={focused ? 'user-alt' : 'user'} size={20} color={color} />
            ),
            tabBarLabel: 'Profile',
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 70, // Adjusted height for better spacing
    borderRadius: 30,
    backgroundColor: '#1054CF', // Updated background color
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    paddingHorizontal: 10,
    paddingTop: 5, // Added top padding
  },
  tabBarIcon: {
    flexDirection: 'column', // Stack icon and label vertically
    alignItems: 'center', // Center the icon and label horizontally
    justifyContent: 'center', // Center the content vertically
    marginBottom: 0, // Remove extra spacing
  },
  tabBarLabel: {
    fontSize: 12, // Font size for labels
    color: '#ccc', // Same shade as the icon
    textAlign: 'center', // Center-align the label
    marginTop: 4, // Add spacing between the icon and the label
  },
});
