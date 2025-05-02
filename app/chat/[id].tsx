import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Image,
  Keyboard,
  ActionSheetIOS,
  Alert,
  Linking
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Add message types
const messageTypes = {
  TEXT: 'text',
  IMAGE: 'image',
  LOCATION: 'location',
  CAR_DETAILS: 'car_details'
};

const messages = [
  {
    id: '1',
    text: 'Is the Tesla still available?',
    sender: 'user',
    timestamp: '2:30 PM',
    type: messageTypes.TEXT,
    status: 'read'
  },
  {
    id: '2',
    text: 'Yes, it is available for rent tomorrow',
    sender: 'other',
    timestamp: '2:31 PM',
    type: messageTypes.TEXT,
    status: 'read'
  },
  {
    id: '3',
    type: messageTypes.CAR_DETAILS,
    sender: 'other',
    timestamp: '2:31 PM',
    carDetails: {
      model: 'Tesla Model S',
      price: '₱7.8k/day',
      image: 'https://placehold.co/300x200',
    },
    status: 'delivered'
  },
  {
    id: '4',
    type: messageTypes.LOCATION,
    sender: 'other',
    timestamp: '2:32 PM',
    location: {
      name: 'Car Pickup Location',
      address: 'SM Lanang Premier, Davao City',
      coordinates: { latitude: 7.1907, longitude: 125.6213 }
    },
    status: 'sent'
  }
];

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  // Typing animation
  useEffect(() => {
    let typingTimeout;
    if (message.length > 0) {
      setIsTyping(true);
      typingTimeout = setTimeout(() => setIsTyping(false), 1000);
    }
    return () => clearTimeout(typingTimeout);
  }, [message]);

  // Show/hide action buttons animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showActions ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [showActions]);

  const handleSend = () => {
    if (message.trim().length === 0) return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: messageTypes.TEXT,
      status: 'sent'
    };

    messages.unshift(newMessage);
    setMessage('');
    Keyboard.dismiss();
  };

  const handleAttachment = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Photo', 'Location', 'Car Details'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) handleImageUpload();
          if (buttonIndex === 2) handleLocationShare();
          if (buttonIndex === 3) handleCarDetailsShare();
        }
      );
    } else {
      setShowActions(!showActions);
    }
  };

  const handleImageUpload = async () => {
    try {
      // Image picker logic would go here
      const mockImageMessage = {
        id: Date.now().toString(),
        type: messageTypes.IMAGE,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        image: 'https://placehold.co/300x200',
        status: 'sent'
      };
      messages.unshift(mockImageMessage);
      setShowActions(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  const handleLocationShare = () => {
    const mockLocationMessage = {
      id: Date.now().toString(),
      type: messageTypes.LOCATION,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      location: {
        name: 'My Location',
        address: 'Current Location',
        coordinates: { latitude: 7.1907, longitude: 125.6213 }
      },
      status: 'sent'
    };
    messages.unshift(mockLocationMessage);
    setShowActions(false);
  };

  const handleCarDetailsShare = () => {
    const mockCarMessage = {
      id: Date.now().toString(),
      type: messageTypes.CAR_DETAILS,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      carDetails: {
        id: '123',
        model: 'Tesla Model S',
        price: '₱7.8k/day',
        image: 'https://placehold.co/300x200',
      },
      status: 'sent'
    };
    messages.unshift(mockCarMessage);
    setShowActions(false);
  };

  const handleOpenMap = (coordinates) => {
    // Open map with coordinates
    const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`;
    Linking.openURL(url);
  };

  const renderMessage = ({ item }) => {
    switch (item.type) {
      case messageTypes.CAR_DETAILS:
        return (
          <TouchableOpacity 
            style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.otherMessage]}
            onPress={() => router.push({
              pathname: "/cardetails",
              params: { id: item.carDetails.id }
            })}
          >
            <Image source={{ uri: item.carDetails.image }} style={styles.carImage} />
            <Text style={[styles.messageText, { color: item.sender === 'user' ? '#000' : '#fff' }]}>
              {item.carDetails.model}
            </Text>
            <Text style={[styles.messageText, { color: item.sender === 'user' ? '#000' : '#fff' }]}>
              {item.carDetails.price}
            </Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
            {renderMessageStatus(item.status)}
          </TouchableOpacity>
        );

      case messageTypes.LOCATION:
        return (
          <TouchableOpacity 
            style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.otherMessage]}
            onPress={() => handleOpenMap(item.location.coordinates)}
          >
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={24} color={item.sender === 'user' ? '#000' : '#fff'} />
              <Text style={[styles.messageText, { color: item.sender === 'user' ? '#000' : '#fff' }]}>
                {item.location.name}
              </Text>
              <Text style={[styles.addressText, { color: item.sender === 'user' ? '#000' : '#fff' }]}>
                {item.location.address}
              </Text>
            </View>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
            {renderMessageStatus(item.status)}
          </TouchableOpacity>
        );

      default:
        return (
          <View style={[
            styles.messageContainer,
            item.sender === 'user' ? styles.userMessage : styles.otherMessage
          ]}>
            <Text style={[styles.messageText, { color: item.sender === 'user' ? '#000' : '#fff' }]}>
              {item.text}
            </Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
            {renderMessageStatus(item.status)}
          </View>
        );
    }
  };

  const renderMessageStatus = (status) => {
    switch (status) {
      case 'sent':
        return <Ionicons name="checkmark" size={16} color="#666" />;
      case 'delivered':
        return <Ionicons name="checkmark-done" size={16} color="#666" />;
      case 'read':
        return <Ionicons name="checkmark-done" size={16} color="#4CAF50" />;
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Luis Angelo</Text>
      </View>

      <View style={styles.typingIndicator}>
        {isTyping && (
          <Text style={styles.typingText}>Luis is typing...</Text>
        )}
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messageList}
        inverted
      />

      <Animated.View style={[
        styles.actionsContainer,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0]
            })
          }]
        }
      ]}>
        <TouchableOpacity style={styles.actionButton} onPress={handleImageUpload}>
          <Ionicons name="image" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleLocationShare}>
          <Ionicons name="location" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleCarDetailsShare}>
          <Ionicons name="car" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleAttachment} style={styles.attachButton}>
          <Ionicons name="add-circle" size={24} color="#1054CF" />
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#666"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        
        <TouchableOpacity 
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Ionicons name="send" size={24} color={message.trim() ? "#fff" : "#999"} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // white-grey background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginTop: 44,
    backgroundColor: '#1054CF', // blue header
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  typingIndicator: {
    padding: 8,
    alignItems: 'center',
  },
  typingText: {
    fontSize: 14,
    color: '#666',
  },
  messageList: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  userMessage: {
    backgroundColor: '#FFB700', // yellow for user messages
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    backgroundColor: '#1054CF', // blue for other messages
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  locationContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  addressText: {
    fontSize: 14,
  },
  carImage: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#1054CF',
  },
  actionButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFB700',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  attachButton: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    color: '#333',
  },
  sendButton: {
    width: 44,
    height: 44,
    backgroundColor: '#1054CF',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
});