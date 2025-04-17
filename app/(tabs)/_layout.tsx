import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false, // disable default label
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#ccc',
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} routeName={route.name} />
          ),
        })}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="rent" />
        <Tabs.Screen name="chats" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </View>
  );
}

function CustomTabBarButton({ accessibilityState, children, onPress, routeName }) {
  const focused = accessibilityState.selected;
  const color = focused ? '#FFFFFF' : '#ccc';

  const iconSize = 24;
  let iconComponent = null;
  let label = '';

  switch (routeName) {
    case 'index':
      iconComponent = <Ionicons name={focused ? 'home' : 'home-outline'} size={iconSize} color={color} />;
      label = 'Home';
      break;
    case 'rent':
      iconComponent = <Ionicons name={focused ? 'car' : 'car-outline'} size={iconSize} color={color} />;
      label = 'Rental';
      break;
    case 'chats':
      iconComponent = <Ionicons name={focused ? 'chatbubbles' : 'chatbubbles-outline'} size={iconSize} color={color} />;
      label = 'Chats';
      break;
    case 'profile':
      iconComponent = <FontAwesome5 name={focused ? 'user-alt' : 'user'} size={20} color={color} />;
      label = 'Profile';
      break;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.tabButton}
      activeOpacity={0.7}
    >
      {iconComponent}
      <Text style={[styles.tabLabel, { color }]}>{label}</Text>
    </TouchableOpacity>
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
    height: 70,
    borderRadius: 30,
    backgroundColor: '#1054CF',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});
