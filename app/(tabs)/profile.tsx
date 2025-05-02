import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Platform
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState('English US');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const menuItems = [
    {
      icon: 'person-outline',
      title: 'Edit Profile',
      action: () => router.push('/editProfile'),
      showArrow: true
    },
    {
      icon: 'location-outline',
      title: 'Address',
      action: () => router.push('/address'),
      showArrow: true
    },
    {
      icon: 'card-outline',
      title: 'Payment',
      action: () => router.push('/payment'),
      showArrow: true
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Security',
      action: () => router.push('/security'),
      showArrow: true
    },
    {
      icon: 'language',
      iconType: 'material',
      title: 'Language',
      value: language,
      action: () => router.push('/language'),
      showArrow: true
    },
    {
      icon: 'moon-outline',
      title: 'Dark Mode',
      isSwitch: true,
      value: isDarkMode,
      action: (value) => setIsDarkMode(value)
    },
    {
      icon: 'shield-outline',
      title: 'Privacy Policy',
      action: () => router.push('/privacy'),
      showArrow: true
    },
    {
      icon: 'help-circle-outline',
      title: 'Help Center',
      action: () => router.push('/help'),
      showArrow: true
    },
    {
      icon: 'people-outline',
      title: 'Invite Friends',
      action: () => router.push('/invite'),
      showArrow: true
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity>
            <Ionicons name="menu-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={40} color="#666" />
            </View>
          )}
          <View style={styles.editIconContainer}>
            <Ionicons name="camera" size={14} color="white" />
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>Jeon Jungkook</Text>
        <Text style={styles.phone}>+63912345678</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => !item.isSwitch && item.action()}
          >
            <View style={styles.menuItemLeft}>
              {item.iconType === 'material' ? (
                <MaterialIcons name={item.icon} size={24} color="#666" />
              ) : (
                <Ionicons name={item.icon} size={24} color="#666" />
              )}
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <View style={styles.menuItemRight}>
              {item.value && !item.isSwitch && (
                <Text style={styles.menuItemValue}>{item.value}</Text>
              )}
              {item.isSwitch ? (
                <Switch
                  value={item.value}
                  onValueChange={item.action}
                  trackColor={{ false: '#767577', true: '#FFB700' }}
                  thumbColor={item.value ? '#fff' : '#f4f3f4'}
                />
              ) : item.showArrow ? (
                <Ionicons name="chevron-forward" size={20} color="#666" />
              ) : null}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?')}
      >
        <Ionicons name="log-out-outline" size={24} color="#FFB700" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // white-grey background
  },
  header: {
    backgroundColor: '#1054CF', // dark theme color
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FFB700', // yellow accent color
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181A20',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#181A20', // dark theme color
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemValue: {
    marginRight: 8,
    color: '#666',
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 20,
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    color: '#FFB700', // yellow accent color
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
