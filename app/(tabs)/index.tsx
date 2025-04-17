import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
const teslaCybertruckImage = require('./teslacybertruck.png');
const nissan370zImage = require('./nissan370z.png');
const userImage = require('./user.png');
const couponImage = require('./coupon.png');





const cars = [
  { id: 1, brand: 'tesla', model: 'Cybertruck', price: '$120/day', rating: 4.9, image: teslaCybertruckImage },
  { id: 2, brand: 'nissan', model: '370Z', price: '$100/day', rating: 4.7, image: nissan370zImage },
  { id: 1, brand: 'tesla', model: 'Cybertruck', price: '$120/day', rating: 4.9, image: teslaCybertruckImage },
  { id: 2, brand: 'nissan', model: '370Z', price: '$100/day', rating: 4.7, image: nissan370zImage },
  { id: 1, brand: 'tesla', model: 'Cybertruck', price: '$120/day', rating: 4.9, image: teslaCybertruckImage },
  { id: 2, brand: 'nissan', model: '370Z', price: '$100/day', rating: 4.7, image: nissan370zImage },
  { id: 1, brand: 'tesla', model: 'Cybertruck', price: '$120/day', rating: 4.9, image: teslaCybertruckImage },
  { id: 2, brand: 'nissan', model: '370Z', price: '$100/day', rating: 4.7, image: nissan370zImage },
  { id: 1, brand: 'tesla', model: 'Cybertruck', price: '$120/day', rating: 4.9, image: teslaCybertruckImage },
  { id: 2, brand: 'nissan', model: '370Z', price: '$100/day', rating: 4.7, image: nissan370zImage },
  // Add more car objects here
];

const username = "Luis"; // Replace with actual Firebase user's name later

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={userImage} style={styles.userImage} />
          <Text style={styles.greeting}>Good morning, <Text style={{ fontWeight: 'bold' }}>{username}</Text></Text>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search bar */}
      <View style={styles.searchSection}>
        <TextInput placeholder="Search cars..." placeholderTextColor="#ccc" style={styles.searchInput} />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Special Offers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Offers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4].map(i => (
            <Image
  key={i}
  source={couponImage}
  style={styles.couponImage}
/>

          ))}
        </ScrollView>
      </View>

      {/* Car Brands */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Car Brands</Text>
        <View style={styles.brandGrid}>
          {['mercedes', 'tesla', 'bmw', 'toyota', 'volvo', 'bugatti', 'honda', 'more'].map((brand, index) => (
            <TouchableOpacity key={index} style={styles.brandCircle}>
              <Text style={styles.brandText}>{brand === 'more' ? '+' : brand[0].toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Top Deals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Deals</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
          {['all', 'tesla', 'nissan'].map((cat, idx) => (
            <TouchableOpacity key={idx} style={styles.categoryButton}>
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.cardContainer}>
          {cars.map((car) => (
            <View key={car.id} style={styles.carCard}>
              <View style={styles.cardHeader}>
                <FontAwesome5 name={car.brand} size={20} color="white" />
                <Ionicons name="heart-outline" size={20} color="white" />
              </View>
              <Image source={car.image} style={styles.carImage} />
              <Text style={styles.carModel}>{car.model}</Text>
              <Text style={styles.carPrice}>{car.price}</Text>
              <Text style={styles.carRating}>⭐ {car.rating}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'column',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 4,
  },
  greeting: {
    color: 'white',
    fontSize: 16,
  },
  icons: {
    flexDirection: 'row',
    gap: 16,
  },
  searchSection: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#2A2C36',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: 'white',
  },
  filterButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    marginLeft: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  couponImage: {
    width: 280,
    height: 120,
    borderRadius: 16,
    marginRight: 12,
  },
  brandGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  brandCircle: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: '#2A2C36',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  brandText: {
    color: 'white',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#2A2C36',
    borderRadius: 16,
    marginRight: 8,
  },
  categoryText: {
    color: 'white',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  carCard: {
    width: '48%',
    backgroundColor: '#2A2C36',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  carImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginVertical: 8,
  },
  carModel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  carPrice: {
    color: '#007BFF',
    fontSize: 14,
  },
  carRating: {
    color: '#ccc',
    fontSize: 12,
  },
});
